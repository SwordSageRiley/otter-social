import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import type { UserWithPass, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

// import { createPool } from '@vercel/postgres';

// const pool = createPool({
//     connectionString: process.env.POSTGRES_URL,
// });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<UserWithPass | undefined> {
    try {
        const user = await sql<UserWithPass[]>`SELECT * FROM users WHERE email=${email}`;
        return user[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

async function checkNewUser(email: string, username: string) {
    try {
        const emailEx = await sql`SELECT COUNT(*) FROM users WHERE email=${email}`;
        const userEx = await sql`SELECT COUNT(*) FROM users WHERE username=${username}`;

        if (emailEx[0].count > 0) {
            throw new Error('email already registered');
        }
        if (userEx[0].count > 0) {
            throw new Error('username already registered');
        }
        return true;
    } catch (error) {
        //console.error('Failed to verify new user:', error);
        console.log(error);
        throw error;
    }
}

async function postNewUser(email: string, username: string, password: string) {
    try {
        await sql`
            INSERT INTO users (username, pw, email)
            VALUES (${username}, ${password}, ${email})            `;
        return true;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user.');
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            id: 'login',
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.pw);
                    if (passwordsMatch) {
                        const retUser = {
                            user_id: user.user_id,
                            email: user.email,
                            username: user.username
                        };
                        return retUser;
                    };
                }
                return null;
            },
        }),
        Credentials({
            id: 'signup',
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6), username: z.string() })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password, username } = parsedCredentials.data;
                    const newUser = await checkNewUser(email, username);
                    if (newUser) {
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const ins = await postNewUser(email, username, hashedPassword);
                    }
                    const user = await getUser(email);
                    if (!user) return null;
                    const retUser = {
                        user_id: user.user_id,
                        email: user.email,
                        username: user.username
                    };
                    return retUser;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            const tempUser = token.user as User;
            session.user = {
                user_id: tempUser.user_id,
                email: tempUser.email,
                username: tempUser.username,
                id: '',
                emailVerified: session.user.emailVerified

            };  
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async signIn(){
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
        }
    }
});


