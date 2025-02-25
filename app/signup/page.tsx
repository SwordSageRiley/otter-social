'use client';

import { Suspense } from "react";
import { useActionState } from "react";
import { signup } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
        signup,
        undefined,
    );

    return (
        <div className="flex p-6 bg-green-900 min-h-screen text-white justify-center">
            <Suspense >
                <form action={formAction} className="flex flex-col text-center">
                    <label htmlFor="email" className="m-2">
                        Email
                    </label>
                    <input className="mb-4"
                        id="email" name="email" type="email" defaultValue="user@test.com" required />
                    <hr className="w-1/2 mx-auto" />
                    <label htmlFor="username" className="m-2">
                        Username
                    </label>
                    <input className="mb-4 text-black"
                        id="username" name="username" type="text" defaultValue="testUser" required />
                    <hr className="w-1/2 mx-auto" />
                    <label htmlFor="password" className="m-2">
                        Password
                    </label>
                    <input className="mb-4 text-black"
                        id="password" name="password" type="password" defaultValue="23456789" required />

                    <input type="hidden" name="redirectTo" value={callbackURL} />
                    <button className="w-32 border rounded mx-auto" aria-disabled={isPending}>
                        Login
                    </button>
                    <div>
                        {errorMessage && (
                            <>
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </form>
            </Suspense>
        </div>
    );
}