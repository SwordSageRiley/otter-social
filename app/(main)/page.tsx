'use client';

import Feed from "@/app/ui/feed";

//import { useSession } from "next-auth/react";

export default function Home() {

  //const {data: session} = useSession();

  return (
    <div>
      <div>
        {/* <p>{`${session}`}</p> */}
      </div>
      <Feed />
    </div>
  );
}
