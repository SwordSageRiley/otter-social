'use client';

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    BsHouseDoor, BsHouseDoorFill,
    BsBell, BsBellFill,
    BsGear, BsGearFill,
    BsChatDots, BsChatDotsFill,
    BsFilePerson, BsFilePersonFill
} from "react-icons/bs";

export default function Navbar() {

    const pn = usePathname();

    return (
        <div className="p-4 text-xl font-extralight">
            <p>pfp placeholder</p>
            {pn === '/' ? (<Link href='/' className="flex"><BsHouseDoorFill /><p className="font-bold">Home</p></Link>)
                : (<Link href='/' className="flex"><BsHouseDoor /><p>Home</p></Link>)}
            {pn === '/notifications' ? (<Link href='/notifications' className="flex"><BsBellFill /><p className="font-bold">Notifications</p></Link>)
                : (<Link href='/notifications' className="flex"><BsBell /><p>Notifications</p></Link>)}
            {pn === '/chats' ? (<Link href='/chats' className="flex"><BsChatDotsFill /><p className="font-bold">Chats</p></Link>)
                : (<Link href='/chats' className="flex"><BsChatDots /><p>Chats</p></Link>)}
            {pn === '/profile' ? (<Link href='/profile' className="flex"><BsFilePersonFill /><p className="font-bold">Profile</p></Link>)
                : (<Link href='/profile' className="flex"><BsFilePerson /><p>Profile</p></Link>)}
            {pn === '/settings' ? (<Link href='/settings' className="flex"><BsGearFill /><p className="font-bold">Settings</p></Link>)
                : (<Link href='/settings' className="flex"><BsGear /><p>Settings</p></Link>)}
        </div>
    );
}