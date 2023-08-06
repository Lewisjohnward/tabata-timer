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
  const whistleRef = useRef<HTMLAudioElement>(null);
  const intervalManager = useInterval(debugArray, whistleRef);

  return (
    <div
      className="relative flex flex-col h-screen text-white p-4 space-y-4 overflow-hidden"
      style={{ backgroundColor: intervalManager.color }}
    >
      <div className="space-y-10">
        <div className="flex justify-center items-center gap-8 text-6xl font-bold">
          <button onClick={() => intervalManager.setLocked((prev) => !prev)}>
            {intervalManager.locked ? <AiFillLock /> : <AiFillUnlock />}
          </button>
          <h1>{intervalManager.getRemainingTime()}</h1>
          <button onClick={() => intervalManager.setRunning((prev) => !prev)}>
            {intervalManager.running ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>
        </div>
        <div className="text-center text-[20rem] leading-none">
          {intervalManager.getCurrentIntervalRemainingTime()}
        </div>
      </div>
      <div className="flex-grow overflow-scroll">
        {debugArray.map((interval, i) => {
          const { id, intervalType, time } = interval;
          return (
            <div
              key={id}
              className={clsx(
                "border-b-[1px] border-white text-center text-4xl",
                i == intervalManager.intervalPosition && "bg-black/30 rounded"
              )}
            >
              <button
                className="py-2 w-full rounded hover:bg-black/30"
                onClick={() => handleChangeInterval(i)}
              >
                <p>{interval.description}</p>
                {i + 1}. {intervalType}: {time}
              </button>
            </div>
          );
        })}
      </div>
      <audio preload="auto" src="/startWhistle.wav" ref={whistleRef} />
    </div>
  );
};
const NavigationButtons = ({
  setView,
}: {
  setView: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 py-4 text-white text-4xl bg-red-200 hover:bg-gray-200">
      <button>
        <FaStepBackward />
      </button>
      <button onClick={() => setView("home")}>
        <AiFillHome />
      </button>
      <button>
        <FaStepForward />
      </button>
    </div>
  );
};

export default ActiveWorkout;
