'use client';

import "@/app/globals.css";

import Navbar from "@/app/ui/navbar";
import PostButton from "@/app/ui/postButton";

import { useSession } from "next-auth/react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";


export default function MainLayout({ children }: { children: React.ReactNode }) {

  const { data: session, status } = useSession();
  const pn = usePathname();

  return (
    <section>
      <div className="flex p-6 bg-green-900 min-h-screen text-white justify-center">
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
    </section>
  );
}
