"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { Plus, Bookmark, Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

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

export default function WorkoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater } = useWorkout();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data.data || data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <p className="text-zinc-500">Loading workout specifications…</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-400 font-bold">Workout not found!</p>
      </div>
    );
  }

  const caloriesValue = getCalories(workout);
  const durationValue = getDuration(workout);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Visual/Media */}
        <div className="relative h-80 sm:h-[450px] lg:h-[550px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Specifications & Instructions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(workout.category) ? (
                workout.category.map((cat, i) => (
                  <span key={i} className="text-xs font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded">
                    {cat.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="text-xs font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded">
                  {String(workout.category || "FITNESS").toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              {workout.name}
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Targeted compound lift engineered for hypertrophy, form stability, and muscle activation.
            </p>
          </div>

          {/* Key Specs Table */}
          <div className="border border-zinc-800 rounded-xl divide-y divide-zinc-800/80 bg-zinc-900/30 text-xs sm:text-sm">
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">EQUIPMENT</span>
              <span className="text-zinc-200 font-medium text-right">{workout.equipment}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">DIFFICULTY</span>
              <span className="text-zinc-200 font-medium text-right">{workout.difficulty || "Intermediate"}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">SETS</span>
              <span className="text-zinc-200 font-medium text-right">{workout.sets || 4}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">REPS</span>
              <span className="text-zinc-200 font-medium text-right">{workout.reps || "8-12"}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">DURATION</span>
              <span className="text-zinc-200 font-medium text-right flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5" />{durationValue} min
              </span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">CALORIES</span>
              <span className="text-zinc-200 font-medium text-right flex items-center justify-end gap-1">
                <Flame className="w-3.5 h-3.5" />{caloriesValue} kcal
              </span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-zinc-500">RATING</span>
              <span className="text-zinc-200 font-medium text-right flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{workout.rating}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-white tracking-wide">INSTRUCTIONS</h3>
            <ol className="space-y-2 text-zinc-300 text-xs sm:text-sm list-decimal list-inside leading-relaxed">
              {workout.instructions && workout.instructions.length > 0 ? (
                workout.instructions.map((step, idx) => <li key={idx} className="pl-1">{step}</li>)
              ) : (
                <>
                  <li className="pl-1">Set up appropriate weights and establish a strong foundation with core engaged.</li>
                  <li className="pl-1">Control the eccentric (lowering) phase smoothly over 2-3 seconds.</li>
                  <li className="pl-1">Pause slightly at full stretch without losing tension.</li>
                  <li className="pl-1">Drive through the primary muscle group explosively back to starting position.</li>
                </>
              )}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToPlan({ ...workout, calories: caloriesValue, duration: durationValue })}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold py-3.5 px-6 rounded-md hover:bg-[#b8e600] transition active:scale-95 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add to today&apos;s plan
            </button>
            <button
              onClick={() => saveForLater({ ...workout, calories: caloriesValue, duration: durationValue })}
              className="flex-1 inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-white font-bold py-3.5 px-6 rounded-md transition active:scale-95 text-sm bg-zinc-900/60"
            >
              <Bookmark className="w-4 h-4" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}