"use client";
import { SetStateAction } from "react";
import useFilter from "../hooks/useFilter";
import { WorkoutObj } from "../types/WorkoutObj";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";

type HomeProps = {
  user: string | undefined;
  workouts: WorkoutObj[];
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
  setView: React.Dispatch<SetStateAction<string>>;
};

const Home = ({
  user,
  workouts,
  setWorkouts,
  setActiveWorkout,
  setWorkoutToEdit,
  setView,
}: HomeProps) => {
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
      <div className="sm:p-1 lg:pl-1 lg:pr-2 space-y-1">
        {filteredWorkouts.map((workout) => (
          <Workout
            user={user}
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
      <AddIcon setView={setView} user={user} />
    </>
  );
};

export default Home;
