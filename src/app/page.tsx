"use client";
import { useState } from "react";
import AddWorkout from "./components/addWorkout";
import Home from "./components/home";

export default function Page() {
  const [view, setView] = useState("addworkout");

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home setView={setView} />
      ) : view == "addworkout" ? (
        <AddWorkout setView={setView} />
      ) : null}
    </main>
  );
}
