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

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "LIBRARY", href: "/library" },
    { label: "REVIEWS", href: "/reviews" },
    { label: "GROUPS", href: "/groups" },
    { label: "ACCOUNT", href: "/account" },
    { label: "SETTINGS", href: "/settings" },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`bg-foreground fixed top-0 right-0 z-50 h-full transform rounded shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} w-2/5 md:w-1/6`}
    >
      <button
        className="absolute top-0 left-0 hover:opacity-70"
        onClick={onClose}
      >
        <img src="/closeSide.png" />
      </button>

      <nav className="flex h-4/5 flex-col items-center justify-end space-y-20 font-bold text-white text-2xl sm:space-y-16 md:space-y-20">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="transition hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
