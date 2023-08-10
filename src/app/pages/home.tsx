import { SetStateAction } from "react";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import Workout from "../components/workout";
import { WorkoutObj } from "../types/Workout";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workouts: WorkoutObj[];
};

const Home = ({ setView, workouts, setActiveWorkout }: Props) => {
  return (
    <>
      <Header workoutCount={workouts.length} />
      <div className="p-1 space-y-1">
        {workouts.map((workout) => (
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
