'use server';

import Link from "next/link";

import { auth } from "@/auth";
import { User } from "@/app/lib/definitions";

import PrivacyForm from "./privacyform";
import { getPrivacy } from "@/app/lib/settingsdata";

export default async function Settings() {
    const session = await auth();
        let user = {
            user_id: '',
            email: '',
            username: '',
            light_mode: 'false'
        } as User;
        if (session) {
            user = session.user as User;
        }
    const priv = await getPrivacy(user.user_id);

    return (
        <div className="flex flex-col">
            <Link href={"/settings"} >Back</Link>
            <PrivacyForm priv={priv}/>
        </div>
    );
}