"use client";
import { useReducer, useState } from "react";
import defaultWorkouts from "@/misc/defaultWorkouts";
import { ActiveWorkout, AddWorkout, Home } from "@/pages";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/helpers/updateThemeColor";

//interface TabataState {
//    view: "home" | "addworkout" | "activeworkout"
//    workouts: WorkoutObj[]
//    activeWorkout:
//}
//
//
//const reducer = (state: ) => {
//    s
//}
//
//const useTabata = () => {
//    const {state, dispatch} = useReducer(, initializerArg, initializer)
//}

const PageSelector = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState(user ? data : defaultWorkouts);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutObj | null>(null);
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      previous = workouts;

    add = workouts[source.index];
    previous.splice(source.index, 1);

    previous.splice(destination.index, 0, add);

    setWorkouts([...previous]);
    updateThemeColor(previous[0].color);
  };

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
