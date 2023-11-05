import defaultWorkouts from "@/misc/defaultWorkouts";
import { create } from "zustand";

type View = "home" | "activeworkout" | "addworkout";

interface Store {
  view: View;
  setView: (view: View) => void;
  activeWorkout: WorkoutObj | null;
  setActiveWorkout: (activeWorkout: WorkoutObj | null) => void;
  workoutToEdit: WorkoutObj | null;
  setWorkoutToEdit: (workoutToEdit: WorkoutObj | null) => void;
  workouts: WorkoutObj[];
  setWorkouts: (workouts: WorkoutObj[]) => void;
  fetchWorkouts: () => void;
}

const useStore = create<Store>()((set) => ({
  view: "home",
  setView: (view) => {
    set(() => ({ view }));
  },
  activeWorkout: null,
  setActiveWorkout: (activeWorkout) => {
    set(() => ({ activeWorkout }));
  },
  workoutToEdit: null,
  setWorkoutToEdit: (workoutToEdit) => {
    set(() => ({ workoutToEdit }));
  },
  workouts: [],
  fetchWorkouts: async () => {
    set(() => ({ workouts: defaultWorkouts }));
  },
  setWorkouts: (workouts) => {
    set(() => ({ workouts }));
  },
}));

export { useStore };

import { createStore } from "zustand";

interface BearProps {
  bears: number;
}

interface BearState extends BearProps {
  addBear: () => void;
}

export type BearStore = ReturnType<typeof createBearStore>;

const createBearStore = (initProps?: Partial<BearProps>) => {
  const DEFAULT_PROPS: BearProps = {
    bears: 6,
  };
  return createStore<BearState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addBear: () => set((state) => ({ bears: ++state.bears })),
  }));
};

export { createBearStore };
