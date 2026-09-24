"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, ArrowDown, ChevronDown } from "lucide-react";
import { Workout } from "@/types/workout";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.data || []);
      })
      .catch((err) => console.error("Error fetching workouts:", err))
      .finally(() => setLoading(false));
  }, []);

  const getNumericValue = (workout: Workout, key: "duration" | "calories" | "rating"): number => {
    let val: string | number | undefined = workout[key];
    if (key === "calories") {
      val = workout.calories ?? workout.calorie ?? workout.caloriesBurned ?? 0;
    }
    const parsed = typeof val === "string" ? parseInt(val.replace(/\D/g, ""), 10) : Number(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const sortedWorkouts = [...workouts]
    .filter((w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(w.category) && w.category.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => getNumericValue(b, sortBy) - getNumericValue(a, sortBy));

  return (
    <div className="space-y-24 pb-20">
      
      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#ccff00] font-bold text-xs uppercase tracking-widest bg-[#ccff00]/10 px-3 py-1 rounded">
              WORKOUT LIBRARY
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              TRAIN WITH INTENT. <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <div>
              <a
                href="#library"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-md hover:bg-[#b8e600] transition active:scale-95"
              >
                BROWSE WORKOUTS
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-800">
            <Image
              src="/assets/banner.png"
              alt="Train Hard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 3. The Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-white tracking-wide">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search & Sort Controls (Challenge C1 & Search) */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search lift or muscle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-[#ccff00]"
            />
            
            <div className="relative inline-flex items-center">
              <span className="text-xs text-zinc-400 mr-2">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
                className="appearance-none bg-zinc-900 border border-zinc-800 rounded-md pl-3 pr-8 py-1.5 text-sm text-white focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 pointer-events-none text-zinc-400" />
            </div>
          </div>
        </div>

        {/* Loading State Structure */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition flex flex-col"
              >
                <div className="relative h-48 w-full bg-zinc-800">
                  <Image
                    src={workout.image || "/assets/banner.png"}
                    alt={workout.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {Array.isArray(workout.category)
                        ? workout.category.map((cat, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold tracking-widest text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded"
                            >
                              {cat.toUpperCase()}
                            </span>
                          ))
                        : (
                          <span className="text-[10px] font-bold text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded">
                            {String(workout.category || "FITNESS").toUpperCase()}
                          </span>
                        )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#ccff00] transition">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">{workout.equipment}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/80 pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" /> {getNumericValue(workout, "duration")} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-zinc-500" /> {getNumericValue(workout, "calories")} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}