import { create } from "zustand";
interface WorkoutStore {
  test: number;
  inc: () => void;
}

const useWorkoutStore = create<WorkoutStore>()((set) => ({
  test: 1,
  inc: () => set((state) => ({ test: state.test + 1 })),
}));

export { useWorkoutStore };
