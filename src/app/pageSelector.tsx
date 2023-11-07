"use client";
import { DragDropContext } from "react-beautiful-dnd";
import { ActiveWorkout, AddWorkout, Home } from "@/pages";
import { useTabata } from "@/hooks/useTabata";
const PageSelector = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const {
    view,
    setView,
    workouts,
    setWorkouts,
    activeWorkout,
    setActiveWorkout,
    workoutToEdit,
    setWorkoutToEdit,
    handleDragEnd,
  } = useTabata({ data });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
    </DragDropContext>
  );
};
export default PageSelector;
