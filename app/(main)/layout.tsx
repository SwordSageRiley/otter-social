'use client';

import "@/app/globals.css";

import Navbar from "@/app/ui/navbar";
import PostButton from "@/app/ui/postButton";

import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

import { User } from "@/app/lib/definitions";

// const LightContext = createContext({light: 'false',setLight: () => {}});


export default function MainLayout({ children }: { children: React.ReactNode }) {

  const { data: session, status } = useSession();
     let user = {
          user_id: '',
          email: '',
          username: '',
          light_mode: 'false'
      } as User;
      if (session) {
          user = session.user as User;
      }
  const pn = usePathname();

  // const [light, setLight] = useState('false');
  // const value = {light, setLight}

  return (
    <section>
      {/* <LightContext.Provider value={value} > */}
      <div className={`flex p-6 min-h-screen justify-center${user.light_mode === "true" ? "bg-white text-black" : "text-white bg-green-900"}`}>
        <section className="" id="nav">
          <Navbar />
        </section>
        <section className="w-5/12 border border-solid border-gray-800 p-2" id="content">
          <Suspense fallback={<div></div>}>
            {children}
          </Suspense>
        </section>
        <section className="" id="search">
          <div className="sticky top-16">
            Search bar lol
          </div>
        </section>
      </div>
      {(pn != "/newpost" && session) ? <PostButton /> : ""}
      {/* </LightContext.Provider> */}
    </section>
  );
}
