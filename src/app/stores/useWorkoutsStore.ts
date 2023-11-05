import { create } from "zustand";
interface WorkoutStore {
  workouts: WorkoutObj[];
  setWorkouts: (workouts: WorkoutObj[]) => void;
}

const useWorkoutsStore = create<WorkoutStore>()((set) => ({
  workouts: [],
  setWorkouts: (workouts) => set(() => ({ workouts })),
}));

export { useWorkoutsStore };
