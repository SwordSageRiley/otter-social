import "@/app/globals.css";

import Navbar from "@/app/ui/navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section>
      <div className="flex p-6 bg-green-900 min-h-screen text-white justify-center">
        <section className="" id="nav">
          <Navbar />
        </section>
        <section className="w-5/12 border border-solid border-gray-800 p-2" id="content">
            {children}
        </section>
        <section className="" id="search">
          <div className="sticky top-16">
            Search bar lol
          </div>
        </section>
      </div>
    </section>
  );
}
