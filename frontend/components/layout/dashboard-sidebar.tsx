"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  GraduationCap,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
  },

  {
    title: "Job Matcher",
    href: "/job-matcher",
    icon: Briefcase,
  },
  {
    title: "Interview",
    href: "/interview",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col justify-between border-r border-zinc-800 bg-zinc-950 text-white lg:flex">

      <div>

        <div className="border-b border-zinc-800 px-6 py-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg">

              <GraduationCap size={28} />

            </div>

            <div>

              <h1 className="text-xl font-bold">

                AI Placement

              </h1>

              <p className="text-sm text-zinc-400">

                Copilot

              </p>

            </div>

          </div>

        </div>

        <div className="px-6 pt-8">

          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">

            Navigation

          </p>

          <nav className="space-y-2">

            {menus.map((menu) => {
              const Icon = menu.icon;

              const active = pathname === menu.href;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon size={20} />

                  <span className="font-medium">

                    {menu.title}

                  </span>
                </Link>
              );
            })}

          </nav>

        </div>

      </div>

      <div className="border-t border-zinc-800 p-6">

        <div className="mb-5 rounded-2xl bg-zinc-900 p-4">

          <p className="font-semibold">

            AI Placement Copilot

          </p>

          <p className="mt-1 text-sm text-zinc-400">

            Crack your next placement 🚀

          </p>

        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-700 py-3 font-medium transition hover:bg-zinc-900">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}