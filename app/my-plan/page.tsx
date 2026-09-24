"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Clock, Flame, Star, Check, X, ArrowRight } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

function getCalories(item: Workout): number {
  const val = item.calories ?? item.calorie ?? item.caloriesBurned ?? 0;
  const parsed = typeof val === "string" ? parseInt(val.replace(/\D/g, ""), 10) : Number(val);
  return isNaN(parsed) ? 0 : parsed;
}

function getDuration(item: Workout): number {
  const val = item.duration ?? 0;
  const parsed = typeof val === "string" ? parseInt(val.replace(/\D/g, ""), 10) : Number(val);
  return isNaN(parsed) ? 0 : parsed;
}

function MyPlanContent() {
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved, toggleDone } = useWorkout();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const setTab = (tab: "plan" | "saved") => {
    router.push(`/my-plan?tab=${tab}`, { scroll: false });
  };

  const totalMinutes = todayPlan.reduce((acc, curr) => acc + getDuration(curr), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + getCalories(curr), 0);

  const displayList = activeTab === "plan" ? todayPlan : savedWorkouts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl">
          <span className="text-zinc-500 text-xs font-semibold uppercase">Exercises</span>
          <p className="text-3xl font-display font-extrabold text-white mt-1">{todayPlan.length}</p>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl">
          <span className="text-zinc-500 text-xs font-semibold uppercase">Minutes</span>
          <p className="text-3xl font-display font-extrabold text-[#ccff00] mt-1">{totalMinutes}</p>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl">
          <span className="text-zinc-500 text-xs font-semibold uppercase">Calories</span>
          <p className="text-3xl font-display font-extrabold text-white mt-1">{totalCalories} kcal</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 gap-8">
        <button
          onClick={() => setTab("plan")}
          className={`pb-3 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
            activeTab === "plan" ? "text-[#ccff00]" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Today&apos;s Plan ({todayPlan.length})
          {activeTab === "plan" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
          )}
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`pb-3 text-sm font-bold tracking-wider uppercase transition-colors relative cursor-pointer ${
            activeTab === "saved" ? "text-[#ccff00]" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Saved ({savedWorkouts.length})
          {activeTab === "saved" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ccff00]" />
          )}
        </button>
      </div>

      {/* List / Empty State */}
      {displayList.length === 0 ? (
        <div className="bg-zinc-900/20 border border-zinc-800/80 rounded-2xl py-16 px-4 text-center space-y-4">
          <h3 className="font-display font-bold text-2xl text-white">NOTHING HERE YET</h3>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black text-xs font-bold px-5 py-2.5 rounded-md hover:bg-[#b8e600] transition"
            >
              Go to workouts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {displayList.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border transition ${
                item.isDone
                  ? "bg-zinc-950/40 border-emerald-950/40 opacity-75"
                  : "bg-zinc-900/40 border-zinc-800"
              }`}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                  <Image src={item.image || "/assets/banner.png"} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className={`font-display font-bold text-base text-white ${item.isDone ? "line-through text-zinc-500" : ""}`}>
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{item.equipment}</p>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{getDuration(item)}m</span>
                    <span className="flex items-center gap-0.5"><Flame className="w-3 h-3" />{getCalories(item)} cal</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/workout/${item.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => toggleDone(item.id)}
                    className={`p-1.5 rounded transition cursor-pointer ${
                      item.isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
                    }`}
                    title="Mark as done"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => (activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-red-950/40 hover:text-red-400 text-zinc-400 transition cursor-pointer"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-500">Loading plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}