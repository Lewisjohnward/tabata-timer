"use client";
import { useState } from "react";
import AddWorkout from "./pages/addWorkout";
import Home from "./pages/home";
import Workout from "./pages/workout";

export default function Page() {
  const [view, setView] = useState("home");

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home setView={setView} />
      ) : view == "addworkout" ? (
        <AddWorkout setView={setView} />
      ) : view == "workout" ? (
        <Workout setView={setView} />
      ) : null}
    </main>
  );
}
