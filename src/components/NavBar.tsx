'use client'; // required because we are using hooks like useState //shouldn't use SSR

import React, { useState } from "react";
import Link from "next/link";
import GenreFilter from "./GenreFilter";

interface Genre {
  id: number;
  name: string;
}

export default function NavBar({ genres }: { genres: Genre[] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="w-full bg-[#141414] border-b border-zinc-800 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center md:justify-between shadow-lg">
      <div className="flex items-center justify-between w-full md:w-auto">
        <span className="text-2xl font-extrabold text-green-400 tracking-tight">MovieFlix</span>
        <button
          className="md:hidden ml-auto text-white focus:outline-none" //hidden with any screen mid<=
          onClick={() => setShowMenu(!showMenu)} 
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className={`w-full md:flex md:items-center md:gap-4 ${showMenu ? "block" : "hidden"} md:block mt-2 md:mt-0`}>
        <Link
          href="/"
          className="block ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 py-2 md:py-0 text-white hover:text-red-500 font-semibold transition"
        >
          Home
        </Link>
        <Link
          href="/favourites"
          className="block py-2 md:py-0 text-white hover:text-red-500 font-semibold transition"
        >
          Favourites
        </Link>
        <GenreFilter genres={genres} />
      </div>
    </nav>
  );
}
