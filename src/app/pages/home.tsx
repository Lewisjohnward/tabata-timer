import { SetStateAction } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import AddIcon from "../components/addIcon";
import Header from "../components/header";
import { Workout as WorkoutType } from "../types/Workout";

type HomeProps = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutType | undefined>>;
  workouts: WorkoutType[];
};

const Home = ({ setView, workouts, setActiveWorkout }: HomeProps) => {
  return (
    <>
      <Header />
      <div className="py-2 space-y-2">
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

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutType | undefined>>;
  workout: WorkoutType;
};

const Workout = ({ setView, workout, setActiveWorkout }: Props) => {
  const openMenu = () => {
    console.log("open menu");
  };

  const handleActivateWorkout = () => {
    setView("workout");
    setActiveWorkout(workout);
  };

  return (
    <div
      className="flex space-between p-4 bg-red-500 text-white shadow-[4px_2px_2px_0px_rgba(0,0,0,0.2)]"
      style={{ backgroundColor: `${workout.color}` }}
    >
      <div>
        <h3 className="font-bold text-xl">{workout.title}</h3>
        <p className="text-lg">
          {workout.totalTime} {workout.intervals} intervals
        </p>
      </div>
      <div className="flex-grow flex justify-end gap-4 text-2xl [&>button]:text-4xl">
        <button>
          <BsFillPlayFill onClick={handleActivateWorkout} />
        </button>
        <button>
          <FaEllipsisV onClick={openMenu} />
        </button>
      </div>
    </div>
  );
};

export default Home;
