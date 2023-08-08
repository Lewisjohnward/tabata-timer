"use client";
import clsx from "clsx";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { AiFillHome, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import generateArray from "../helpers/generateArray";
import useInterval from "../hooks/useTimer";
import { Workout } from "../types/Workout";
import getIntervalDetails from "../helpers/getIntervalDetails";
import convertTime from "../helpers/convertTime";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  activeWorkout: Workout | undefined;
};

import { v4 as uuidv4 } from "uuid";

const debugWorkout = {
  id: uuidv4,
  title: "biceps baby",
  totalTime: 69,
  intervals: 69,
  color: "#ffffff",
  prepare: 10,
  workDescription: "test description",
  work: 25,
  restDescription: "rest description",
  rest: 15,
  cycles: 2,
  sets: 1,
  restBetweenSets: 0,
  cooldown: 15,
};

const debugArray = [
  {
    id: uuidv4(),
    intervalType: "prepare",
    time: 5,
  },
  {
    id: uuidv4(),
    description: "a very very long test work description",
    intervalType: "work",
    time: 600,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 300,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 3,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 3,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 3,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 3,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    description: "test rest description",
    intervalType: "rest",
    time: 3,
  },
  {
    id: uuidv4(),
    description: "test work description",
    intervalType: "work",
    time: 6,
  },
  {
    id: uuidv4(),
    intervalType: "cooldown",
    time: 2,
  },
];

const ActiveWorkout = ({ setView, activeWorkout }: Props) => {
  const startWhistleRef = useRef<HTMLAudioElement>(null);
  const beepRef = useRef<HTMLAudioElement>(null);
  const endWhistleRef = useRef<HTMLAudioElement>(null);
  const endBellRef = useRef<HTMLAudioElement>(null);

  const intervalManager = useInterval(
    debugArray,
    startWhistleRef,
    beepRef,
    endWhistleRef,
    endBellRef
  );

  return (
    <div
      className="h-screen"
      style={{ backgroundColor: intervalManager.color }}
    >
      <div className="relative flex flex-col gap-5 text-white p-4 h-[90vh] md:h-[95vh] lg:h-screen lg:flex-row lg:justify-center lg:items-center lg:gap-10">
        <CurrentInterval setView={setView} intervalManager={intervalManager} />
        <div className="hidden lg:block bg-white w-[1px] h-3/6" />
        <IntervalList
          intervals={debugArray}
          intervalManager={intervalManager}
        />
        <div className="lg:hidden w-full flex justify-evenly gap-4 py-4 text-white text-4xl">
          <NavigationButtons
            setView={setView}
            gotoNextInterval={intervalManager.gotoNextInterval}
          />
        </div>
        <audio preload="auto" src="/startWhistle.wav" ref={startWhistleRef} />
        <audio preload="auto" src="/beep.mp3" ref={beepRef} />
        <audio preload="auto" src="/endWhistle.mp3" ref={endWhistleRef} />
        <audio preload="auto" src="/endBell.mp3" ref={endBellRef} />
      </div>
    </div>
  );
};
const NavigationButtons = ({
  setView,
  gotoNextInterval,
}: {
  setView: React.Dispatch<SetStateAction<string>>;
  gotoNextInterval: () => void;
}) => {
  return (
    <>
      <button>
        <FaStepBackward />
      </button>
      <button onClick={() => setView("home")}>
        <AiFillHome />
      </button>
      <button onClick={gotoNextInterval}>
        <FaStepForward />
      </button>
    </>
  );
};

type CurrentIntervalProps = {
  intervalManager: {
    setLocked: React.Dispatch<SetStateAction<boolean>>;
    locked: boolean;
    getTotalRemainingTime: () => string;
    setRunning: React.Dispatch<SetStateAction<boolean>>;
    running: boolean;
    getCurrentIntervalRemainingTime: () => number;
    gotoNextInterval: () => void;
  };
  setView: React.Dispatch<SetStateAction<string>>;
};

const CurrentInterval = ({
  intervalManager,
  setView,
}: CurrentIntervalProps) => {
  return (
    <div className="flex flex-col justify-evenly lg:h-4/6">
      <div className="flex justify-evenly items-center gap-8 text-4xl lg:text-6xl font-bold overflow-hidden">
        <button onClick={() => intervalManager.setLocked((prev) => !prev)}>
          {intervalManager.locked ? <AiFillLock /> : <AiFillUnlock />}
        </button>
        <h1 className="w-36 px-4 lg:w-48">
          {intervalManager.getTotalRemainingTime()}
        </h1>
        <button onClick={() => intervalManager.setRunning((prev) => !prev)}>
          {intervalManager.running ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
      </div>

      <div className="text-center lg:w-[550px] text-[10rem] lg:text-[15rem]">
        {intervalManager.getCurrentIntervalRemainingTime()}
      </div>
      <div className="hidden w-full lg:flex justify-evenly gap-4 py-4 text-white text-4xl">
        <NavigationButtons
          setView={setView}
          gotoNextInterval={intervalManager.gotoNextInterval}
        />
      </div>
    </div>
  );
};

type IntervalListProps = {
  intervals: {
    id: string;
    description?: string;
    intervalType: string;
    time: number;
  }[];
  intervalManager: {
    intervalPosition: number;
    handleChangeInterval: () => void;
  };
};

const IntervalList = ({ intervals, intervalManager }: IntervalListProps) => {
  return (
    <div className="overflow-scroll lg:h-4/6">
      {intervals.map((interval, i) => {
        const { id, intervalType, time, description } = interval;
        return (
          <div
            key={id}
            className={clsx(
              "border-b-[1px] border-white text-center text-2xl lg:text-4xl",
              i == intervalManager.intervalPosition && "bg-black/30 rounded"
            )}
          >
            <button
              className="py-2 w-full rounded px-4 hover:bg-black/30"
              onClick={() => handleChangeInterval(i)}
            >
              <p>{description}</p>
              {i + 1}. {intervalType}: {time}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveWorkout;
