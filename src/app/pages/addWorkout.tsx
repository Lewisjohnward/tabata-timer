"use client";
import { useState } from "react";
import NumberInput, { TextInput } from "@/components/input";
import useCreateWorkout from "@/hooks/useCreateWorkout";
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
  tabata: Tabata;
};

const AddWorkout = ({ tabata }: Props) => {
  const { state, dispatch } = useCreateWorkout(tabata.workoutToEdit);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);

  document.body.style.overflow = "scroll";

  const cancelAddWorkout = () => {
    tabata.setWorkoutToEdit(null);
    tabata.setView("home");
  };

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
                <button
                  onClick={() => {
                    tabata.createWorkout(state);
                  }}
                >
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
