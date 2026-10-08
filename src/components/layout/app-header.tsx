import Link from "next/link";
import { Activity } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b border-neutral-300 bg-[#f3f0e8]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f261f] text-white">
            <Activity className="h-5 w-5" />
          </div>

          <div>
            <p className="font-semibold leading-none text-[#1f261f]">
              Noah
            </p>

            <p className="mt-1 text-xs text-[#5f665f]">
              Energy Operations
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#6b6259] sm:block">
            Interactive concept prototype
          </span>

          <div className="h-2 w-2 rounded-full bg-emerald-600" />

          <span className="text-xs font-medium text-[#303630]">
            Platform online
          </span>
        </div>
      </div>
    </header>
  );
}