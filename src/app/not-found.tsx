import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f3f0e8] px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4dfd4] text-[#5f4f3f]">
          <TriangleAlert className="h-6 w-6" />
        </div>

        <p className="mt-6 text-sm font-semibold tracking-wide text-[#725f4c]">
          RESOURCE NOT FOUND
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#1f261f]">
          This energy system doesn&apos;t exist.
        </h1>

        <p className="mt-4 text-[#5f665f]">
          The location or asset you requested could not be found in the
          current prototype.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1f261f] px-5 py-3 font-medium text-white transition hover:bg-[#303a30]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}