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
import Input, { TextInput } from "../components/input";
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
  const {
    title,
    setTitle,
    color,
    setColor,
    prepare,
    setPrepare,
    work,
    setWork,
    rest,
    setRest,
    cycles,
    setCycles,
    sets,
    setSets,
    restBetweenSets,
    setRestBetweenSets,
    cooldown,
    setCooldown,
    intervals,
    totalTime,
    createWorkoutObject,
    summary,
  } = useCreateWorkout(workoutToEdit);

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
          style={{ backgroundColor: color }}
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
              {`${convertTime(totalTime)}. ${intervals} intervals`}
            </p>
          </div>
        </div>

        <div className="pr-4 pt-4 space-y-4 text-2xl">
          <TextInput
            inputType={"text"}
            icon={<MdTitle />}
            label={"Title"}
            value={title}
            setValue={setTitle}
          />
          <Input
            inputType={"number"}
            icon={<FaWalking />}
            label={"Prepare"}
            value={prepare}
            minValue={0}
            setValue={setPrepare}
          />
          <Input
            inputType={"number"}
            icon={<GiWeightLiftingUp />}
            label={"Work"}
            value={work}
            minValue={1}
            setValue={setWork}
          />
          <Input
            inputType={"number"}
            icon={<GiSofa />}
            label={"Rest"}
            value={rest}
            minValue={0}
            setValue={setRest}
          />
          <Input
            inputType={"number"}
            icon={<BsArrowRepeat />}
            label={"Cycles"}
            value={cycles}
            minValue={1}
            setValue={setCycles}
          />
          <Input
            inputType={"number"}
            icon={<BsFillStopwatchFill />}
            label={"Sets"}
            value={sets}
            minValue={1}
            setValue={setSets}
          />
          <Input
            inputType={"number"}
            icon={<RxSpaceBetweenHorizontally />}
            label={"Rest between sets"}
            value={restBetweenSets}
            minValue={0}
            setValue={setRestBetweenSets}
          />
          <Input
            inputType={"number"}
            icon={<BsSnow />}
            label={"Cool down"}
            value={cooldown}
            minValue={0}
            setValue={setCooldown}
          />
        </div>
      </div>
      {summaryVisible && (
        <Summary
          setSummaryVisible={setSummaryVisible}
          summaryObj={summary}
          color={color}
        />
      )}
      {paletteVisible && (
        <Palette
          setPaletteVisible={setPaletteVisible}
          setColor={setColor}
          selectedColor={color}
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
