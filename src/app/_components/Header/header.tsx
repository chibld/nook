"use client";

import { useState } from "react";
import { Sidebar } from "../Sidebar/sidebar";
import Link from "next/link";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex">
            <Link href="/">
                <img src="/nookLogo.png" className="top-0 left-0 m-5 h-auto w-35" />
            </Link>
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
