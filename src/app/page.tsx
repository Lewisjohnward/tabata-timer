"use client";
import { useState } from "react";
import ActiveWorkout from "./pages/activeWorkout";
import AddWorkout from "./pages/addWorkout";
import Home from "./pages/home";
import { Workout } from "./types/Workout";

export default function Page() {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<Workout>();

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
        <ActiveWorkout setView={setView} workoutObj={activeWorkout} />
      ) : null}
    </main>
  );
}
