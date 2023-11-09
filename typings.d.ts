interface WorkoutObj {
  id: string;
  position: number;
  title: string;
  favourite: boolean;
  totalTime: number;
  intervals: number;
  color: string;
  prepare: number;
  work: number;
  rest: number;
  cycles: number;
  sets: number;
  restBetweenSets: number;
  cooldown: number;
}

type Tabata = {
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj | null>>;
  activeWorkout: WorkoutObj | null;
  workoutToEdit: WorkoutObj | null;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
  setView: React.Dispatch<SetStateAction<string>>;
  createWorkout: (createdWorkout: WorkoutObj) => void;
  duplicateWorkout: (id: string) => void;
  deleteWorkout: (id: string) => void;
  toggleFavorite: (id: string) => void;
  activateWorkout: (id: string) => void;
  editWorkout: (id: string) => void;
};
