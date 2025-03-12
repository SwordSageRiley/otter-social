'use client';

import { sendpost } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/app/lib/definitions";
import Link from "next/link";

export default function NewPostPage() {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
        sendpost,
        undefined,
    );
    const { data: session, status } = useSession();

    let user = {
        user_id: '',
        email: '',
        username: ''
    } as User;

    if (session) {
        user = session.user as User;
    }

    return (
        <div>
            <Link href="/" className="border rounded p-2">{"< "}Back</Link>
            <form action={formAction} className="flex flex-col">
                <label htmlFor="body" className="">
                </label>
                <textarea className="text-black w-7/8 mb-6 mt-4 min-h-16 p-2 bg-green-100 rounded"
                    id="body" name="body" placeholder="Enter your post" rows={5} required />
                <button className="w-32 border rounded ml-auto" aria-disabled={isPending}>
                    Post
                </button>
                <input className=""
                    id="user_id" name="user_id" type="hidden" defaultValue={user.user_id} />
            </form>
        </div>
    );

}