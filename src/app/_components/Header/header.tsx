"use client";

import SearchBar from "../SearchBar/searchBar";
import { useState } from "react";
import { Sidebar } from "../Sidebar/sidebar";
import Link from "next/link";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative flex items-center justify-between px-6 py-4">
            <Link href="/" className="absolute top-5 left-5">
                <img src="/nookLogo.png" className="h-auto w-35" />
            </Link>
            <div className="relative flex flex-1 top-2 justify-center">
                <div className="relative w-full">
                    <SearchBar />
                </div>
            </div>

            <button
                className="absolute top-0 right-0"
                onClick={() => setIsOpen(true)}
            >
                <img src="/openSide.png" />
            </button>
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </header>
    );
}
