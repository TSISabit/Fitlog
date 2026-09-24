"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = useWorkout();

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0f12]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded overflow-hidden">
            <Image 
              src="/assets/logo.png" 
              alt="FitLog Logo" 
              fill 
              className="object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }} 
            />
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white">FITLOG</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 font-semibold text-sm">
          <Link
            href="/"
            className={`transition-colors ${
              pathname === "/" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`transition-colors ${
              pathname === "/my-plan" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-full hover:brightness-110 transition active:scale-95 cursor-pointer"
          >
            <span>Plan</span>
            <span className="bg-black/20 text-black px-1.5 py-0.5 rounded-full text-[10px]">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-full hover:border-zinc-500 hover:text-white transition active:scale-95 cursor-pointer"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-full text-[10px]">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}