//"use client";
//const [view, setView] = useState("home");
//const [workouts, setWorkouts] = useState<WorkoutObj[]>([]);
//const [activeWorkout, setActiveWorkout] = useState<WorkoutObj>(
//  {} as WorkoutObj
//);
//const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);
//const [user, setUser] = useState<undefined | string>(undefined);
//import { useState, useEffect } from "react";
//const getWorkouts = async () => {
//  const { data } = await supabase.from("workouts").select();
//  data && setWorkouts(data);
//{view == "home" ? (
//  <Home
//    setView={setView}
//    workouts={workouts}
//    setWorkouts={setWorkouts}
//    setActiveWorkout={setActiveWorkout}
//    setWorkoutToEdit={setWorkoutToEdit}
//    user={user}
//  />
//) : view == "addworkout" ? (
//  <AddWorkout
//    setView={setView}
//    setWorkouts={setWorkouts}
//    workoutToEdit={workoutToEdit}
//    setWorkoutToEdit={setWorkoutToEdit}
//  />
//) : view == "workout" ? (
//  <ActiveWorkout setView={setView} workout={activeWorkout} />
//) : null}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ActiveWorkout from "./pages/activeWorkout";
import AddWorkout from "./pages/addWorkout";
import Home from "./pages/home";
import { WorkoutObj } from "./types/WorkoutObj";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main className="relative min-h-full">
      {!user ? (
        <Link href="/login">Login</Link>
      ) : (
        <form action="/auth/sign-out" method="post">
          <button>Logout</button>
        </form>
      )}
    </main>
  );
}
