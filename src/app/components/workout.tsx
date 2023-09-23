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
import { AiFillStar } from "react-icons/ai";
import Modal from "./modal";
import Link from "next/link";

const ExpandedWorkoutView = ({ workout }: { workout: WorkoutObj }) => {
  return (
    <div className="text-xl">
      <p>{workout.prepare > 0 && `Prepare: ${workout.prepare}`}</p>
      <p>{`Work: ${workout.work}`}</p>
      <p>{workout.rest > 0 && `Rest: ${workout.rest}`}</p>
      <p>{workout.cooldown > 0 && `Cooldown: ${workout.cooldown}`}</p>
      <p>{workout.cycles > 0 && `Cycles: ${workout.cycles}`}</p>
      <p>{workout.sets > 0 && `Sets: ${workout.sets}`}</p>
    </div>
  );
};

type Props = {
  user: string | undefined;
  expandedWorkout: boolean;
  setView: React.Dispatch<SetStateAction<string>>;
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>;
  workout: WorkoutObj;
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
};

const Workout = ({
  user,
  expandedWorkout,
  setView,
  workout,
  setWorkouts,
  setActiveWorkout,
  setWorkoutToEdit,
}: Props) => {
  const menu = useMenu(
    user,
    setView,
    setActiveWorkout,
    setWorkoutToEdit,
    workout,
    setWorkouts
  );
  return (
    <>
      <div
        className="relative flex space-between p-4 text-white rounded-lg"
        style={{ backgroundColor: `${workout.color}` }}
      >
        <div className="space-y-2">
          <h3 className="font-bold text-3xl">{workout.title}</h3>
          {expandedWorkout && <ExpandedWorkoutView workout={workout} />}
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
          {workout.favourite && (
            <AiFillStar className="absolute top-2 right-2 text-sm" />
          )}
          <div className="relative flex justify-center items-center">
            <button>
              <FaEllipsisV onClick={menu.toggleMenu} />
            </button>
            {menu.menuOpen && (
              <Menu
                duplicateWorkout={menu.duplicateWorkout}
                toggleFavorite={menu.toggleFavorite}
                favorite={workout.favourite}
                deleteWorkout={menu.deleteWorkout}
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
      {menu.displayModal && (
        <Modal
          closePortal={() => {
            menu.setDisplayModal(false);
            menu.setMenuOpen(false);
          }}
        >
          <div className="w-full h-full flex justify-center items-center bg-black/20">
            <div className="flex flex-col items-center gap-4 bg-white p-10 rounded shadow-lg">
              Login to edit workouts
              <Link
                href="/login"
                className="bg-black/20 px-4 py-2 rounded shadow hover:bg-black/40"
              >
                Login/Sign up
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Workout;
