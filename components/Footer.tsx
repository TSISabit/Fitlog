import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#090a0c] border-t border-zinc-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image src="/assets/logo.png" alt="FitLog Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-sm tracking-wider text-white">FITLOG</span>
        </Link>
        <p className="text-xs text-zinc-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}