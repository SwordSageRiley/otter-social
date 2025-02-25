import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
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
        console.error('Error in database:', error);
        throw new Error('Failed to verify new user.');
    }
}

async function postNewUser(email: string, username: string, password: string) {
    try {
        const ins = await sql`
            INSERT INTO users (username, pw, email)
            VALUES (${username}, ${password}, ${email})
            ON CONFLICT (user_id) DO NOTHING;
            `;
            return ins;
    } catch (error) {

    }
}

export const { auth, signIn, signOut } = NextAuth({
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
                    if (passwordsMatch) return user;
                }
                return null;
            },
        }),
        Credentials({
            id: 'signup',
            async authorize(credentials) {
                console.log('started singup');
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6), username: z.string() })
                    .safeParse(credentials);
                    console.log('parsed credentials');
                if (parsedCredentials.success) {
                    console.log('credentials good');
                    const { email, password, username } = parsedCredentials.data;
                    const newUser = await checkNewUser(email, username);
                    console.log('checked if new user');
                    if (newUser) {
                        console.log('new user');
                        const hashedPassword = await bcrypt.hash(password, 10);
                        const ins = await postNewUser(username, email, hashedPassword);
                        console.log('posted new user');
                    }
                    const user = await getUser(email);
                    console.log('retrieved user data');
                    if (!user) return null;
                    return user;
                }

                return null;
            },
        }),
    ],
});

