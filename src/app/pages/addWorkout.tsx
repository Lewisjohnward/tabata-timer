"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SetStateAction, useState } from "react";
import NumberInput, { TextInput } from "@/components/input";
import useCreateWorkout from "@/hooks/useWorkout";
import convertTime from "@/helpers/convertTime";
import Summary from "@/components/summary";
import Palette from "@/components/palette";
import { colors } from "@/misc/colors";
import {
  AiOutlineClose,
  AiFillEye,
  BsArrowRepeat,
  BsFillStopwatchFill,
  BsSnow,
  BsFillPaletteFill,
  FaWalking,
  GiWeightLiftingUp,
  GiSofa,
  MdTitle,
  RxSpaceBetweenHorizontally,
  TiTick,
} from "@/misc/icons";
import { updateThemeColor } from "@/hooks/useUpdateHeaderColor";
import { useStore } from "@/stores/useWorkoutsStore";

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
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
};

const AddWorkout = ({ setWorkouts }: Props) => {
  const { setView, workoutToEdit, setWorkoutToEdit } = useStore();
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

  updateThemeColor(state.color);

  return (
    <>
      <div className="relative text-sky-900">
        <div
          className="px-6 py-4 text-white shadow-xl"
          style={{ backgroundColor: state.color }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-4">
                <button onClick={cancelAddWorkout}>
                  <AiOutlineClose className="text-xl" />
                </button>
                <h1 className="text-xl">Add workout</h1>
              </div>
              <div className="flex items-center gap-4 text-2xl">
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
            <p className="text-center text-xl">
              {`${convertTime(state.totalTime)}. ${state.intervals} intervals`}
            </p>
          </div>
        </div>

        <div className="px-4 pt-4 space-y-4 text-xl">
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
