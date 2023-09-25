"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import NumberInput, { TextInput } from "@/components/input";
import useCreateWorkout from "@/hooks/useWorkout";
import { WorkoutObj } from "@/types/WorkoutObj";
import convertTime from "@/helpers/convertTime";
import Summary from "@/components/summary";
import Palette from "@/components/palette";
import { colors } from "@/misc/colors";

const defaultWorkout = {
  id: "0",
  title: "Bicep curls",
  favourite: false,
  totalTime: 0,
  intervals: 0,
  color: "#dc2626",
  prepare: 10,
  work: 30,
  rest: 10,
  cycles: 1,
  sets: 1,
  restBetweenSets: 0,
  cooldown: 10,
};

const inputArray = [
  {
    key: "prepare",
    displayText: "Prepare",
    icon: <FaWalking />,
  },
  {
    key: "work",
    displayText: "Work",
    icon: <GiWeightLiftingUp />,
  },
  {
    key: "rest",
    displayText: "Rest",
    icon: <GiSofa />,
  },
  {
    key: "cycles",
    displayText: "Cycles",
    icon: <BsArrowRepeat />,
  },
  {
    key: "sets",
    displayText: "Sets",
    icon: <BsFillStopwatchFill />,
  },
  {
    key: "restBetweenSets",
    displayText: "Rest between sets",
    icon: <RxSpaceBetweenHorizontally />,
  },
  {
    key: "cooldown",
    displayText: "Cooldown",
    icon: <BsSnow />,
  },
];

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
  const { state, dispatch } = useCreateWorkout(
    workoutToEdit || { ...defaultWorkout }
  );
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const supabase = createClientComponentClient();

  document.body.style.overflow = "scroll";

  const handleCreateWorkout = async () => {
    if (workoutToEdit) {
      const { error } = await supabase
        .from("workouts")
        .update(state)
        .eq("id", workoutToEdit.id);
      console.log(error);
      setWorkouts((prev) => {
        const index = prev.findIndex(
          (prevWorkout) => prevWorkout.id === state.id
        );
        const newWorkoutArr = prev.filter(({ id }) => id != workoutToEdit.id);
        newWorkoutArr.splice(index, 0, state);
        return newWorkoutArr;
      });
      setWorkoutToEdit(null);
    } else {
      const { error } = await supabase.from("workouts").insert(state);
      console.log("Error - add Workout: ", error);
      setWorkouts((prev) => [...prev, { ...state }]);
    }
    setView("home");
  };

  const cancelAddWorkout = () => {
    setWorkoutToEdit(null);
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
          {inputArray.map((d) => (
            <NumberInput
              key={d.key}
              icon={d.icon}
              displayText={d.displayText}
              property={d.key}
              value={+state[d.key as keyof WorkoutObj]}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      {summaryVisible && (
        <Summary
          setSummaryVisible={setSummaryVisible}
          workout={state}
          color={state.color}
        />
      )}
      {paletteVisible && (
        <Palette
          closePalette={() => setPaletteVisible(false)}
          dispatch={dispatch}
          selectedColor={state.color}
          closeOnSelect={false}
          displaySelection={true}
          displayNumbers={false}
          colors={colors}
        />
      )}
    </>
  );
};

export default AddWorkout;
