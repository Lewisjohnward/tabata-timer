"use client";
import { useState } from "react";
import defaultWorkouts from "@/misc/defaultWorkouts";
import { ActiveWorkout, AddWorkout, Home } from "@/pages";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/hooks/useUpdateHeaderColor";
import { createBearStore, useStore } from "@/stores/useWorkoutsStore";
import { useStore as _useStore } from "zustand";

const PageSelector = ({
  user,
  data,
}: {
  user: string | undefined;
  data: WorkoutObj[];
}) => {
  const view = useStore((state) => state.view);
  //const workouts = useStore((state) => state.workouts);
  //const setWorkouts = useStore((state) => state.setWorkouts);
  //setWorkouts(data);

  const store = createBearStore({ bears: 5 });
  const bears = _useStore(store, (state) => state.bears);
  console.log(bears);

  ///////////////////
  const [workouts, setWorkouts] = useState(user ? data : defaultWorkouts);

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
  ///////////////////

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {view == "home" && (
        <Home user={user} workouts={workouts} setWorkouts={setWorkouts} />
      )}
      {view == "activeworkout" && <ActiveWorkout />}
      {view == "addworkout" && <AddWorkout setWorkouts={setWorkouts} />}
    </DragDropContext>
  );
};
export default PageSelector;
