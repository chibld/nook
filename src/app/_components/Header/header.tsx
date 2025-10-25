"use client";

import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
import { Sidebar } from "../Sidebar/sidebar";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="flex h-24 w-full items-center justify-between">
          <Link href="/" className="flex items-center pl-4">
            <img src="/nookLogo.png" className="h-auto w-35 object-contain" />
          </Link>

          <div className="relative mx-6 max-w-md flex-1">
            <SearchBar />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center hover:opacity-70"
          >
            <img src="/openSide.png" />
          </button>
        </div>
      </header>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
