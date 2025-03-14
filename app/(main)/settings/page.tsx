

import Link from "next/link";

export default function Settings(){
    return (
        <div className="flex flex-col">
            <Link href="/settings/account">Account</Link>
            <Link href="/settings/privacy">Privacy</Link>
            <p>Change light mode</p>
        </div>
    );
}