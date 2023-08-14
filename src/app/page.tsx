"use client";
import { useState } from "react";
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

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home
          setView={setView}
          workouts={workouts}
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
