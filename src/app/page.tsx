"use client";
import { useState } from "react";
import AddWorkout from "./components/addWorkout";
import Home from "./components/home";
import Workout from "./components/workout";

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
