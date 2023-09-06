"use client";
import { SetStateAction } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { WorkoutObj } from "../types/WorkoutObj";
import useMenu from "../hooks/useMenu";
import convertTime from "../helpers/convertTime";
import Menu from "./menu";
import Summary from "./summary";
import generateSummary from "../helpers/generateSummary";

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
  const menu = useMenu(setView, setActiveWorkout, setWorkoutToEdit, workout);
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
            <BsFillPlayFill onClick={menu.handleActivateWorkout} />
          </button>
          <div className="relative flex justify-center items-center">
            <button>
              <FaEllipsisV onClick={menu.toggleMenu} />
            </button>
            {menu.menuOpen && (
              <Menu
                closeMenu={() => menu.setMenuOpen(false)}
                yPosition={menu.yPosition}
                handleEdit={menu.handleEdit}
                handlePreview={menu.handlePreview}
              />
            )}
            {menu.summaryOpen && (
              <Summary
                setSummaryVisible={menu.setSummaryOpen}
                workout={workout}
                color={workout.color}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workout;
