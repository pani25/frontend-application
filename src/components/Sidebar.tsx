import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Sidebar() {
  const router = useRouter();

  const linkClass = (path: string) =>
    "block px-4 py-2 rounded " + (router.pathname === path ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-800");

  return (
    <aside className="w-56 bg-white dark:bg-gray-800 border-r min-h-screen p-4">
      <nav className="space-y-2">
        <Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link href="/dashboard/events" className={linkClass("/dashboard/events")}>Event</Link>
      </nav>
    </aside>
  );
}