"use client";
import { useState } from "react";
import ActiveWorkout from "./pages/activeWorkout";
import AddWorkout from "./pages/addWorkout";
import { WorkoutObj } from "./types/WorkoutObj";
import defaultWorkouts from "./misc/defaultWorkouts";
import Home from "./pages/home";

const PageSelector = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState(user ? data : defaultWorkouts);
  const [activeWorkout, setActiveWorkout] = useState({} as WorkoutObj);
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);

  return (
    <>
      {view == "home" && (
        <Home
          user={user}
          workouts={workouts}
          setWorkouts={setWorkouts}
          setView={setView}
          setActiveWorkout={setActiveWorkout}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      )}
      {view == "activeworkout" && (
        <ActiveWorkout setView={setView} workout={activeWorkout} />
      )}
      {view == "addworkout" && (
        <AddWorkout
          setView={setView}
          setWorkouts={setWorkouts}
          workoutToEdit={workoutToEdit}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      )}
    </>
  );
};
export default PageSelector;
