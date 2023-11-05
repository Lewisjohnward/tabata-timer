import defaultWorkouts from "@/misc/defaultWorkouts";
import { create } from "zustand";
interface WorkoutStore {
  workouts: WorkoutObj[];
  setWorkouts: (workouts: WorkoutObj[]) => void;
}

const useWorkoutsStore = create<WorkoutStore>()((set) => ({
  workouts: defaultWorkouts,
  setWorkouts: (workouts) => {
    console.log("set workouts");
    set(() => ({ workouts }));
  },
}));

export { useWorkoutsStore };
