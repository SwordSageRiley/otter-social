'use client';

import clsx from "clsx";
import { usePathname } from "next/navigation";

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
            <p className={clsx("", { "font-bold": pn === '/' })}> <BsHouseDoor/> Home</p>
            <p className={clsx("", { "font-bold": pn === '/notifications' })}>Notifications</p>
            <p className={clsx("", { "font-bold": pn === '/chats' })}>Chats</p>
            <p className={clsx("", { "font-bold": pn === '/feeds' })}>Feeds</p>
            <p className={clsx("", { "font-bold": pn === '/Not sure what to do here yet' })}>Profile</p>
            <p className={clsx("", { "font-bold": pn === '/settings' })}>Settings</p>

            {pn === '/' ? (<p className="font-bold"><BsHouseDoorFill/> Home </p>) : (<p><BsHouseDoor/> Home</p>)}
        </div>
    );
}