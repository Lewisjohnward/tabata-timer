"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import ActiveWorkout from "./pages/activeWorkout";
import AddWorkout from "./pages/addWorkout";
import Home from "./pages/home";
import { WorkoutObj } from "./types/WorkoutObj";

export default function Page() {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState<WorkoutObj[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutObj>(
    {} as WorkoutObj
  );
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);
  const [user, setUser] = useState<undefined | string>(undefined);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.email);
    };
    getUser();
  }, [supabase]);

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home
          setView={setView}
          workouts={workouts}
          setWorkouts={setWorkouts}
          setActiveWorkout={setActiveWorkout}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      ) : view == "addworkout" ? (
        <AddWorkout
          setView={setView}
          setWorkouts={setWorkouts}
          workoutToEdit={workoutToEdit}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      ) : view == "workout" ? (
        <ActiveWorkout setView={setView} workout={activeWorkout} />
      ) : null}
    </main>
  );
}
