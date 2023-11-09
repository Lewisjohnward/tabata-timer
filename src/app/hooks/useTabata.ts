import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/helpers/updateThemeColor";
import defaultWorkouts from "@/misc/defaultWorkouts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UseTabata {
  data: WorkoutObj[];
  user: string | undefined;
}

const useTabata = ({ data, user }: UseTabata) => {
  const [view, setView] = useState<"home" | "addworkout" | "activeworkout">(
    "home"
  );
  const [workouts, setWorkouts] = useState(user ? data : defaultWorkouts);
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

  const editWorkout = (id: string) => {
    const [workout] = workouts.filter((workout) => workout.id == id);
    console.log(workout);
    setWorkoutToEdit(workout);
    setView("addworkout");
  };

  const activateWorkout = (id: string) => {
    const [workout] = workouts.filter((workout) => workout.id == id);
    setView("activeworkout");
    setActiveWorkout(workout);
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

  const duplicateWorkout = async (id: string) => {
    const [workoutToDuplicate] = workouts.filter((w) => w.id == id);
    const duplicateWorkout = { ...workoutToDuplicate };
    duplicateWorkout.id = uuidv4();
    duplicateWorkout.title = `${duplicateWorkout.title} copy`;

    const { error } = await supabase.from("workouts").insert(duplicateWorkout);
    console.log(error);
    setWorkouts((prev) => [...prev, duplicateWorkout]);
  };

  const deleteWorkout = async (id: string) => {
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    console.log(error);
    setWorkouts((prev: WorkoutObj[]) => {
      const filteredWorkouts = prev.filter((prev) => id != prev.id);
      return filteredWorkouts;
    });
  };

  const toggleFavorite = async (id: string) => {
    const [workout] = workouts.filter((w) => w.id == id);
    const favourite = !workout.favourite;

    const { error } = await supabase
      .from("workouts")
      .update({ favourite })
      .eq("id", id);
    console.log(error);

    setWorkouts((prev: WorkoutObj[]) => {
      const updatedArr = prev.map((d) => {
        if (d.id == id) {
          return { ...workout, favourite };
        } else return d;
      });
      return updatedArr;
    });
  };

  return {
    view,
    setView,
    workouts,
    setWorkouts,
    activeWorkout,
    activateWorkout,
    setActiveWorkout,
    editWorkout,
    workoutToEdit,
    setWorkoutToEdit,
    handleDragEnd,
    createWorkout,
    duplicateWorkout,
    deleteWorkout,
    toggleFavorite,
  };
};

export { useTabata };
