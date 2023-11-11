import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { updateThemeColor } from "@/helpers/updateThemeColor";
import defaultWorkouts from "@/misc/defaultWorkouts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface UseTabata {
  data: WorkoutObj[];
  user: string | undefined;
}

const rearrangeWorkouts = (
  source: number,
  destination: number,
  workouts: WorkoutObj[]
) => {
  if (source > destination) {
    const updatedWorkouts = workouts.map((workout) => {
      if (source == workout.position)
        return { ...workout, position: destination };
      else if (destination <= workout.position && workout.position < source)
        return { ...workout, position: workout.position + 1 };
      else return workout;
    });
    return updatedWorkouts;
  } else {
    const updatedWorkouts = workouts.map((workout) => {
      if (source == workout.position)
        return { ...workout, position: destination };
      else if (workout.position >= source && workout.position <= destination)
        return { ...workout, position: workout.position - 1 };
      else return workout;
    });
    return updatedWorkouts;
  }
};

const useTabata = ({ data, user }: UseTabata) => {
  const [view, setView] = useState<"home" | "addworkout" | "activeworkout">(
    "home"
  );
  const [workouts, setWorkouts] = useState(user ? data : defaultWorkouts);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutObj | null>(null);
  const [workoutToEdit, setWorkoutToEdit] = useState<WorkoutObj | null>(null);
  const supabase = createClientComponentClient();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const _updatedWorkouts = rearrangeWorkouts(
      source.index,
      destination.index,
      workouts
    );

    setWorkouts([..._updatedWorkouts]);
    updateThemeColor(_updatedWorkouts[0].color);
    const { data, error } = await supabase
      .from("workouts")
      .upsert(_updatedWorkouts)
      .select();
    console.log(data);
    console.log(error);
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
      console.log(createdWorkout);
      const { error } = await supabase.from("workouts").insert(createdWorkout);
      console.log("Error - add Workout: ", error);
      setWorkouts((prev) => [...prev, { ...createdWorkout }]);
    }
    setView("home");
  };

  const duplicateWorkout = async (id: string) => {
    const { data: workouts, error } = await supabase.rpc("duplicate_workout", {
      workout_id: id,
    });
    if (!error) setWorkouts(workouts);
    else console.log("duplicate workout error: ", error);
  };

  const deleteWorkout = async (id: string) => {
    const { data: workouts, error } = await supabase.rpc("delete_workout", {
      workout_id: id,
    });
    if (!error) setWorkouts(workouts);
    else console.log("duplicate workout error: ", error);
    setWorkouts(workouts);
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
