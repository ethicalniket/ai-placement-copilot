"use client";

import Link from "next/link";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },

  {
    title: "Career Coach",
    href: "/career",
  },

  {
    title: "Coding Arena",
    href: "/coding",
  },

  {
    title: "AI Interview",
    href: "/interview",
  },

  {
    title: "Profile",
    href: "/profile",
  },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-64 h-screen border-r p-6">

      <h1 className="text-2xl font-bold mb-8">

        AI Placement Copilot

      </h1>

      <nav className="space-y-4">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className="block rounded-lg px-4 py-3 hover:bg-muted"
          >

            {menu.title}

          </Link>

        ))}

      </nav>

    </aside>
  );
}