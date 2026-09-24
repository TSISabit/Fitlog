"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";
import toast from "react-hot-toast";

interface WorkoutContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleDone: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const localPlan = localStorage.getItem("fitlog_todayPlan");
      if (localPlan) {
        try {
          return JSON.parse(localPlan);
        } catch (e) {
          console.error("Failed to parse todayPlan from localStorage", e);
        }
      }
    }
    return [];
  });

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    if (typeof window !== "undefined") {
      const localSaved = localStorage.getItem("fitlog_savedWorkouts");
      if (localSaved) {
        try {
          return JSON.parse(localSaved);
        } catch (e) {
          console.error("Failed to parse savedWorkouts from localStorage", e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("fitlog_todayPlan", JSON.stringify(todayPlan));
  }, [todayPlan]);

  useEffect(() => {
    localStorage.setItem("fitlog_savedWorkouts", JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  const addToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Cap reached: Maximum 5 lifts allowed for today!");
      return;
    }
    if (todayPlan.some((item) => String(item.id) === String(workout.id))) {
      toast("Already added to today's plan!", { icon: "ℹ️" });
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (savedWorkouts.some((item) => String(item.id) === String(workout.id))) {
      toast("Already saved for later!", { icon: "ℹ️" });
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setTodayPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Removed from plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSavedWorkouts((prev) => prev.filter((item) => String(item.id) !== String(id)));
    toast.success("Removed from saved lifts");
  };

  const toggleDone = (id: string | number) => {
    setTodayPlan((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, isDone: !item.isDone } : item
      )
    );
    toast.success("Workout status updated!");
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
}