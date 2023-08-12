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
import Modal from "../components/modal";
import useCreateWorkout from "../hooks/useWorkout";
import { WorkoutObj } from "../types/WorkoutObj";
import convertTime from "../helpers/convertTime";
import { colors } from "../misc/colors";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>;
};

const AddWorkout = ({ setView, setWorkouts }: Props) => {
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
  } = useCreateWorkout();

  const [summaryVisible, setSummaryVisible] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);

  const handleCreateWorkout = () => {
    const workout = createWorkoutObject();
    setWorkouts((prev) => [...prev, workout]);
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
                <button onClick={() => setPaletteVisible(true)}>
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
        <Summary setSummaryVisible={setSummaryVisible} summaryObj={summary} />
      )}
      {paletteVisible && (
        <Palette
          setPaletteVisible={setPaletteVisible}
          setColor={setColor}
          selectedColor={color}
        />
      )}
    </>
  );
};

export default AddWorkout;

type PaletteProps = {
  setPaletteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
};

const Palette = ({
  setPaletteVisible,
  setColor,
  selectedColor,
}: PaletteProps) => {
  const handleColorSelect = (
    event: React.MouseEvent<HTMLElement>,
    color: string
  ) => {
    event.stopPropagation();
    setColor(color);
  };

  return (
    <Modal closePortal={() => setPaletteVisible(false)}>
      <div className="bg-white rounded shadow p-4 space-y-4">
        <h2 className="text-xl font-bold">Select a color</h2>
        <div className="grid grid-cols-5 justify-items-center gap-4">
          {colors.map((color) => (
            <button
              key={color}
              className="w-28 h-28 rounded-full"
              style={{ backgroundColor: color }}
              onClick={(e) => handleColorSelect(e, color)}
            >
              {selectedColor == color && (
                <TiTick className="m-auto text-6xl text-white bg-black/10 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

type SummaryProps = {
  setSummaryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  summaryObj: any;
};

const Summary = ({ setSummaryVisible, summaryObj }: SummaryProps) => {
  const { numberOfSets, totals, summary } = summaryObj;

  return (
    <Modal closePortal={() => setSummaryVisible(false)}>
      <div className="bg-white h-[500px] w-[800px] overflow-scroll rounded shadow text-center space-y-4">
        {numberOfSets && <p>Number of sets: {numberOfSets}</p>}
        <div>
          {totals.map((total: string) => (
            <p>{total}</p>
          ))}
        </div>
        <div className="space-y-2">
          {summary.map((d: string) => (
            <p>{d}</p>
          ))}
        </div>
      </div>
    </Modal>
  );
};
