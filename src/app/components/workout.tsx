import { SetStateAction } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { WorkoutObj } from "../types/WorkoutObj";
import convertTime from "../helpers/convertTime";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workout: WorkoutObj;
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
      className="flex space-between p-4 text-white rounded-lg"
      style={{ backgroundColor: `${workout.color}` }}
    >
      <div className="space-y-4">
        <h3 className="font-bold text-xl">{workout.title}</h3>
        <p className="text-xl">
          {`Total: ${convertTime(workout.totalTime)} - ${
            workout.intervals
          } intervals`}
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

export default Workout;
