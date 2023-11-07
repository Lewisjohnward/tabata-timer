import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/helpers/updateThemeColor";
import defaultWorkouts from "@/misc/defaultWorkouts";

interface UseTabata {
  data: WorkoutObj[];
}

const useTabata = ({ data }: UseTabata) => {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState(data ? data : defaultWorkouts);
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

  return {
    view,
    setView,
    workouts,
    setWorkouts,
    activeWorkout,
    setActiveWorkout,
    workoutToEdit,
    setWorkoutToEdit,
    handleDragEnd,
  };
};

export { useTabata };
