'use client';

import { sendpost } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/app/lib/definitions";

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
            <form action={formAction}>
                <label htmlFor="body" className="m-2">
                </label>
                <input className="text-black w-2/3"
                    id="body" name="body" type="text" placeholder="Enter your post" required />
                <button className="w-32 border rounded mx-auto" aria-disabled={isPending}>
                    Post
                </button>
                <input className=""
                    id="user_id" name="user_id" type="hidden" defaultValue={user.user_id} />
            </form>
        </div>
    );

}