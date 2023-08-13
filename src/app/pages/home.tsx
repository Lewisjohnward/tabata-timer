"use client";
import { SetStateAction } from "react";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";
import { WorkoutObj } from "../types/WorkoutObj";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workouts: WorkoutObj[];
  filterByColor: string;
  setFilterByColor: React.Dispatch<SetStateAction<string>>;
};

const Home = ({
  setView,
  workouts,
  setActiveWorkout,
  filterByColor,
  setFilterByColor,
}: Props) => {
  const filteredWorkouts =
    filterByColor == ""
      ? workouts
      : workouts.filter(({ color }) => color == filterByColor);

  return (
    <>
      <Header
        workoutCount={filteredWorkouts.length}
        workouts={workouts}
        filterByColor={filterByColor}
        setFilterByColor={setFilterByColor}
      />
      <div className="p-1 space-y-1">
        {filteredWorkouts.map((workout) => (
          <Workout
            key={workout.id}
            setView={setView}
            workout={workout}
            setActiveWorkout={setActiveWorkout}
          />
        ))}
      </div>
      <AddIcon setView={setView} />
    </>
  );
};

export default Home;
