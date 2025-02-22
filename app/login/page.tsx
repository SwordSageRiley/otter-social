'use client';

import { Suspense } from "react";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex p-6 bg-green-900 min-h-screen text-white justify-center">
            <Suspense >
                <form action={formAction} className="flex flex-col text-center">
                    <label htmlFor="user" className="m-2">
                        Email
                    </label>
                    <input className="mb-4"
                        id="email" name="email" type="email" placeholder="Enter your email" required />
                    <hr className="w-1/2 mx-auto" />
                    <label htmlFor="password" className="m-2">
                        Password
                    </label>
                    <input className="mb-4"
                        id="password" name="password" type="password" placeholder="Enter password" required />

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