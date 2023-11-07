interface WorkoutObj {
  id: string;
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
};
