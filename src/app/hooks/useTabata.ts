import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/helpers/updateThemeColor";
import defaultWorkouts from "@/misc/defaultWorkouts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UseTabata {
  data: WorkoutObj[];
}

const useTabata = ({ data }: UseTabata) => {
  const [view, setView] = useState("home");
  const [workouts, setWorkouts] = useState(data ? data : defaultWorkouts);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutObj | null>(null);
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);
  const supabase = createClientComponentClient();

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

  const createWorkout = async (createdWorkout: WorkoutObj) => {
    if (workoutToEdit) {
      const { error } = await supabase
        .from("workouts")
        .update(createdWorkout)
        .eq("id", workoutToEdit.id);
      console.log(error);
      setWorkouts((prev) => {
        const index = prev.findIndex(
          (prevWorkout) => prevWorkout.id === createdWorkout.id
        );
        const newWorkoutArr = prev.filter(({ id }) => id != workoutToEdit.id);
        newWorkoutArr.splice(index, 0, createdWorkout);
        return newWorkoutArr;
      });
      setWorkoutToEdit(null);
    } else {
      createdWorkout.position = workouts.length;
      const { error } = await supabase.from("workouts").insert(createdWorkout);
      console.log("Error - add Workout: ", error);
      setWorkouts((prev) => [...prev, { ...createdWorkout }]);
    }
    setView("home");
  };

  const duplicateWorkout = async (workout: WorkoutObj) => {
    const { error } = await supabase
      .from("workouts")
      .insert({ ...workout, id: uuidv4() });
    console.log(error);
    const duplicateWorkout = { ...workout, id: uuidv4() };
    setWorkouts((prev) => [...prev, duplicateWorkout]);
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
    createWorkout,
    duplicateWorkout,
  };
};

export { useTabata };
