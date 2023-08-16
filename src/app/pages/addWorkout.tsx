"use client";
import { SetStateAction, useState } from "react";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import {
  BsFillPaletteFill,
  BsArrowRepeat,
  BsFillStopwatchFill,
  BsSnow,
} from "react-icons/bs";
import { FaWalking } from "react-icons/fa";
import { GiWeightLiftingUp, GiSofa } from "react-icons/gi";
import { RxSpaceBetweenHorizontally } from "react-icons/rx";
import { MdTitle } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import NumberInput, { TextInput } from "../components/input";
import useCreateWorkout from "../hooks/useWorkout";
import { WorkoutObj } from "../types/WorkoutObj";
import convertTime from "../helpers/convertTime";
import Summary from "../components/summary";
import Palette from "../components/palette";
import { colors } from "../misc/colors";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
  workoutToEdit: WorkoutObj | null;
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>;
};

const AddWorkout = ({
  setView,
  setWorkouts,
  workoutToEdit,
  setWorkoutToEdit,
}: Props) => {
  const { state, dispatch } = useCreateWorkout(workoutToEdit);

  const [summaryVisible, setSummaryVisible] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);

  const handleCreateWorkout = () => {
    const workout = createWorkoutObject();
    if (workoutToEdit) {
      setWorkouts((prev) => {
        const index = prev.findIndex(
          (prevWorkout) => prevWorkout.id === workout.id
        );
        const newWorkoutArr = prev.filter(({ id }) => id != workoutToEdit.id);
        newWorkoutArr.splice(index, 0, workout);
        return newWorkoutArr;
      });
      setWorkoutToEdit(null);
    } else {
      setWorkouts((prev) => [...prev, workout]);
    }
    setView("home");
  };

  const cancelAddWorkout = () => {
    setView("home");
  };

  return (
    <>
      <div className="relative text-sky-900 pb-4">
        <div
          className="px-6 py-4 text-white font-bold"
          style={{ backgroundColor: state.color }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-4">
                <button onClick={cancelAddWorkout}>
                  <AiOutlineClose className="text-4xl" />
                </button>
                <h1 className="text-2xl">Add workout</h1>
              </div>
              <div className="flex items-center gap-6 text-3xl">
                <button onClick={() => setSummaryVisible(true)}>
                  <AiFillEye />
                </button>
                <button className="" onClick={() => setPaletteVisible(true)}>
                  <BsFillPaletteFill />
                </button>
                <button onClick={handleCreateWorkout}>
                  <TiTick />
                </button>
              </div>
            </div>
            <p className="text-center text-2xl">
              {`${convertTime(state.totalTime)}. ${state.intervals} intervals`}
            </p>
          </div>
        </div>

        <div className="pr-4 pt-4 space-y-4 text-2xl">
          <TextInput
            icon={<MdTitle />}
            label={"Title"}
            value={state.title}
            dispatch={dispatch}
          />
          <NumberInput
            icon={<MdTitle />}
            label={"prepare"}
            minValue={0}
            value={state.prepare}
            dispatch={dispatch}
            increment={() =>
              dispatch({
                type: "increment",
                payload: { key: "prepare" },
              })
            }
            decrement={() =>
              dispatch({
                type: "decrement",
                payload: { key: "prepare" },
              })
            }
          />
          <NumberInput
            icon={<MdTitle />}
            label={"work"}
            minValue={0}
            value={state.work}
            dispatch={dispatch}
            increment={() =>
              dispatch({
                type: "increment",
                payload: { key: "work" },
              })
            }
            decrement={() =>
              dispatch({
                type: "decrement",
                payload: { key: "work" },
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default AddWorkout;
