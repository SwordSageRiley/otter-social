'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";

import { User } from "@/app/lib/definitions";

export default async function Settings() {
    const { data: session, status } = useSession();
    if (session) {
        const user = session.user as User;
    }

    return (
        <div className="flex flex-col">
            <Link href="/settings/account">Account</Link>
            <Link href="/settings/privacy">Privacy</Link>
        </div>
    );
}