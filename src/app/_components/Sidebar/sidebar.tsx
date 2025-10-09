"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={sidebarRef}
            className={`fixed bg-foreground rounded top-0 right-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <button className="absolute top-0 left-0" onClick={onClose}>
                <img src="/closeSide.png" />
            </button>

            <nav className="flex flex-col items-center justify-center text-white h-9/10 space-y-16 text-2xl font-bold">
                <Link
                    href="/"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    HOME
                </Link>
                <Link
                    href="/library"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    LIBRARY
                </Link>
                <Link
                    href="/reviews"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    REVIEWS
                </Link>
                <Link
                    href="/groups"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    GROUPS
                </Link>
                <Link
                    href="/account"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    ACCOUNT
                </Link>
                <Link
                    href="/settings"
                    className="hover:text-gray-300 transition"
                    onClick={onClose}
                >
                    SETTINGS
                </Link>
            </nav>
        </div>
    );
};
