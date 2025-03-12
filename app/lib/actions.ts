'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostNewPost } from "@/app/lib/data";
import { Post } from "@/app/lib/definitions";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
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
        revalidatePath('/');
        redirect('/');
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    try {
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

export async function sendpost(
    prevState: string | undefined,
    formData: FormData
) {
    const user_id = formData.get('user_id');
    const body = formData.get('body');

    try {
        if (user_id && body) {
            await PostNewPost(user_id.toString(), body.toString());
        }

    } catch (error) {
        return 'Failed to create post';
    }
    finally {
        revalidatePath('/');
        redirect('/');
    }

}
