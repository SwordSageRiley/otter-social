'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { useRouter } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    const router = useRouter();
    try {
        await signIn('login', formData);
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    } finally {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        revalidatePath('/');
        router.push('/');
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
        if (error instanceof AuthError) {
            console.log(error.type)
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


