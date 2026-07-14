"use client";

import DashboardSidebar from "@/components/layout/dashboard-sidebar";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col">

        {/* Header */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-8 shadow-sm">

          <div className="flex items-center gap-4">

            <button className="rounded-xl border border-zinc-200 p-2 lg:hidden">

              <Menu size={20} />

            </button>

            <div className="relative hidden md:block">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                placeholder="Search..."
                className="w-80 rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500"
              />

            </div>

          </div>

          <div className="flex items-center gap-4">

            <button className="relative rounded-xl border border-zinc-200 bg-white p-3 transition hover:bg-zinc-100">

              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />

            </button>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 font-semibold text-white">

                N

              </div>

              <div className="hidden md:block">

                <p className="font-semibold text-zinc-900">

                  Niket

                </p>

                <p className="text-sm text-zinc-500">

                  Student

                </p>

              </div>

            </div>

          </div>

        </header>

        {/* Main Content */}

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
}