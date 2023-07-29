"use client";
import { useEffect, useState } from "react";
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
import { HomeProps } from "./types";
import Input, { TextInput } from "./input";

const AddWorkout = ({ setView }: HomeProps) => {
  const [title, setTitle] = useState("Bicep curls");
  const [prepare, setPrepare] = useState(10);
  const [work, setWork] = useState(25);
  const [rest, setRest] = useState(10);
  const [cycles, setCycles] = useState(1);
  const [sets, setSets] = useState(1);
  const [restBetweenSets, setRestBetweenSets] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  //const [totalTime, setTotalTime] = useState(0)
  const [intervals, setIntervals] = useState(0);

  //const formatTime = (time : number) => {

  //}

  const handleReturnHome = () => {
    setView("home");
  };
  //{`${formatTime(totalTime)}. ${intervals} intervals`}

  const calculateIntervalCount = () => {
    let intervalsPerCycle = 0;

    if (work > 0) intervalsPerCycle++;
    if (rest > 0) intervalsPerCycle++;
      intervalsPerCycle *= cycles
      intervalsPerCycle--

    if (prepare > 0) intervalsPerCycle++;
    //if (cooldown > 0) intervalsPerCycle++;

      return intervalsPerCycle

  };

  useEffect(() => {
    const totalIntervals = calculateIntervalCount();
    setIntervals(totalIntervals);
  }, [prepare, work, rest, cycles, sets, rest, cooldown]);

  return (
    <div className="relative text-sky-900 pb-4">
      <div className="bg-orange-600 px-6 py-4 text-white font-bold">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
              <button onClick={handleReturnHome}>
                <AiOutlineClose className="text-4xl" />
              </button>
              <h1 className="text-2xl">Add workout</h1>
            </div>
            <div className="flex items-center gap-6 text-3xl">
              <button>
                <AiFillEye />
              </button>
              <button>
                <BsFillPaletteFill />
              </button>
              <button>
                <TiTick />
              </button>
            </div>
          </div>
          <p className="text-center text-2xl">
            {`3:0. ${intervals} intervals`}
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
          setValue={setPrepare}
        />
        <Input
          inputType={"number"}
          icon={<GiWeightLiftingUp />}
          label={"Work"}
          value={work}
          setValue={setWork}
        />
        <Input
          inputType={"number"}
          icon={<GiSofa />}
          label={"Rest"}
          value={rest}
          setValue={setRest}
        />
        <Input
          inputType={"number"}
          icon={<BsArrowRepeat />}
          label={"Cycles"}
          value={cycles}
          setValue={setCycles}
        />
        <Input
          inputType={"number"}
          icon={<BsFillStopwatchFill />}
          label={"Sets"}
          value={sets}
          setValue={setSets}
        />
        <Input
          inputType={"number"}
          icon={<RxSpaceBetweenHorizontally />}
          label={"Rest between sets"}
          value={restBetweenSets}
          setValue={setRestBetweenSets}
        />
        <Input
          inputType={"number"}
          icon={<BsSnow />}
          label={"Cool down"}
          value={cooldown}
          setValue={setCooldown}
        />
      </div>
    </div>
  );
};

export default AddWorkout;
