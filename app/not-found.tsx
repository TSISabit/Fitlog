import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
      <h1 className="font-display text-8xl font-black text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-tight text-white">LIFT NOT FOUND</h2>
      <p className="text-zinc-400 text-sm max-w-sm mx-auto">
        The routine or route you are looking for has been moved, completed, or doesn&apos;t exist.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-md hover:bg-[#b8e600] transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}