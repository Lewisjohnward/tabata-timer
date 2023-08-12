"use client";
import { useState } from "react";
import ActiveWorkout from "./pages/activeWorkout";
import AddWorkout from "./pages/addWorkout";
import Home from "./pages/home";
import { WorkoutObj } from "./types/WorkoutObj";

export default function Page() {
  const [view, setView] = useState("addworkout");
  const [workouts, setWorkouts] = useState<WorkoutObj[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutObj>(
    {} as WorkoutObj
  );

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home
          setView={setView}
          workouts={workouts}
          setActiveWorkout={setActiveWorkout}
        />
      ) : view == "addworkout" ? (
        <AddWorkout setView={setView} setWorkouts={setWorkouts} />
      ) : view == "workout" ? (
        <ActiveWorkout setView={setView} workout={activeWorkout} />
      ) : null}
    </main>
  );
}
