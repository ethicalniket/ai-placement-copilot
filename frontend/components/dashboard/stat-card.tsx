import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-indigo-100 opacity-40 transition-all duration-300 group-hover:scale-125" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">

            {title}

          </p>

          <h2 className="mt-4 text-4xl font-bold text-zinc-900">

            {value}

          </h2>

          <p className="mt-3 text-sm text-zinc-500">

            {subtitle}

          </p>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110">

          {icon}

        </div>

      </div>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-4">

        <span className="text-sm font-medium text-green-600">

          +12% this week

        </span>

        <ArrowUpRight
          size={18}
          className="text-zinc-400 transition group-hover:text-indigo-600"
        />

      </div>

    </div>
  );
}