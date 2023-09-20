"use client";
import { SetStateAction } from "react";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";
import { WorkoutObj } from "../types/WorkoutObj";
import useFilter from "../hooks/useFilter";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
  user: string | undefined;
};

const Home = ({
  setView,
  workouts,
  setWorkouts,
  setActiveWorkout,
  setWorkoutToEdit,
  user,
}: Props) => {
  const { filter, dispatch, filteredWorkouts, colorCount } =
    useFilter(workouts);

  return (
    <>
      <Header
        filter={filter}
        dispatch={dispatch}
        filteredWorkouts={filteredWorkouts}
        colorCount={colorCount}
        user={user}
      />
      <div className="p-1 space-y-1">
        {filteredWorkouts.map((workout) => (
          <Workout
            key={workout.id}
            expandedWorkout={filter.expandedWorkouts}
            setView={setView}
            workout={workout}
            setWorkouts={setWorkouts}
            setActiveWorkout={setActiveWorkout}
            setWorkoutToEdit={setWorkoutToEdit}
          />
        ))}
      </div>
      <AddIcon setView={setView} />
    </>
  );
};

export default Home;
