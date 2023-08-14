"use client";
import { useState } from "react";
import { SetStateAction } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { WorkoutObj } from "../types/WorkoutObj";
import convertTime from "../helpers/convertTime";
import Menu from "./menu";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workout: WorkoutObj;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
};

const Workout = ({
  setView,
  workout,
  setActiveWorkout,
  setWorkoutToEdit,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yPosition, setYPosition] = useState(0);

  const toggleMenu = (event: any) => {
    setYPosition(event.clientY);
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setView("addworkout");
    setWorkoutToEdit(workout);
  };

  const handlePreview = () => {
    console.log("preview");
  };

  const handleActivateWorkout = () => {
    setView("workout");
    setActiveWorkout(workout);
  };

  return (
    <>
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
          <div className="relative flex justify-center items-center">
            <button>
              <FaEllipsisV onClick={toggleMenu} />
            </button>
            {menuOpen && (
              <Menu
                closeMenu={() => setMenuOpen(false)}
                yPosition={yPosition}
                handleEdit={handleEdit}
                handlePreview={handlePreview}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workout;
