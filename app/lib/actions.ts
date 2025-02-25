'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from 'zod';

import { User } from "@/app/lib/definitions";

import postgres from 'postgres';



const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('login', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        console.log('signup action');
        await signIn('signup', formData);
    } catch (error) {
        return 'something went wrong'
    }
}

async function newUser(email: string, username: string) {
    try {
        const exists = await sql`SELECT COUNT(*) FROM users WHERE email=${email} OR username=${username}`;
        return exists[0];

    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}