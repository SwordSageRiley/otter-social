'use client';

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useSession } from "next-auth/react";


import { updatePrivacy } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";

export default function PrivacyForm(priv: any) {
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get('callbackUrl') || '/settings';
    const [errorMessage, formAction, isPending] = useActionState(
        updatePrivacy,
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

    const privacy = priv.priv;

    return (
        <form action={formAction} className="flex flex-col">
            <label htmlFor="privacy" >Account Privacy Level</label>
            <select id="privacy" name="privacy" className="text-black" defaultValue={privacy}>
                <option value="public" id="public">Anyone Can See</option>
                <option value="private" id="private">Registered Users Only</option>
                <option value="hidden" id="hidden">Followers Only</option>
            </select>
            <button className="w-32 border rounded mx-auto" aria-disabled={isPending}>
                Update
            </button>
            <input className=""
                id="user_id" name="user_id" type="hidden" defaultValue={user.user_id} />
        </form>
    )
}