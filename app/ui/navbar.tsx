'use client';

import { usePathname, } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "../lib/definitions";

import {
    BsHouseDoor, BsHouseDoorFill,
    BsBell, BsBellFill,
    BsGear, BsGearFill,
    BsChatDots, BsChatDotsFill,
    BsFilePerson, BsFilePersonFill
} from "react-icons/bs";

export default function Navbar() {

    const pn = usePathname();
    const { data: session, status } = useSession();

    let user = {
        user_id: '',
        email: '',
        username: ''
    } as User;

    if (session){
        user = session.user as User;
    }

    return (
        <div className="p-4 text-xl font-extralight sticky top-16">

            {status === "authenticated" ?
                <div>
                    <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                    {pn === '/' ? (<Link href='/' className="flex"><BsHouseDoorFill /><p className="font-bold">Home</p></Link>)
                        : (<Link href='/' className="flex hover:underline"><BsHouseDoor /><p>Home</p></Link>)}
                    {pn === '/notifications' ? (<Link href='/notifications' className="flex"><BsBellFill /><p className="font-bold">Notifications</p></Link>)
                        : (<Link href='/notifications' className="flex hover:underline"><BsBell /><p>Notifications</p></Link>)}
                    {pn === '/chats' ? (<Link href='/chats' className="flex"><BsChatDotsFill /><p className="font-bold">Chats</p></Link>)
                        : (<Link href='/chats' className="flex hover:underline"><BsChatDots /><p>Chats</p></Link>)}
                    {pn.includes('/p/') ? (<Link href={`/p/${user.username}`} className="flex"><BsFilePersonFill /><p className="font-bold">Profile</p></Link>)
                        : (<Link href={`/p/${user.username}`} className="flex hover:underline"><BsFilePerson /><p>Profile</p></Link>)}
                    {pn === '/settings' ? (<Link href='/settings' className="flex"><BsGearFill /><p className="font-bold">Settings</p></Link>)
                        : (<Link href='/settings' className="flex hover:underline"><BsGear /><p>Settings</p></Link>)}

                    <form action={() => signOut()} ><button>Sign Out</button> </form>
                </div>
                :
                <div >
                    <Link href='/login'>Sign In</Link>
                </div>}
        </div>
    );
}