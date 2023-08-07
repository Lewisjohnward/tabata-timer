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
      className="relative flex flex-col md:flex-row md:justify-center md:gap-20 h-screen text-white p-4"
      style={{ backgroundColor: intervalManager.color }}
    >
      <div>
        <div className="flex justify-center items-center gap-8 text-4xl md:text-6xl font-bold">
          <button onClick={() => intervalManager.setLocked((prev) => !prev)}>
            {intervalManager.locked ? <AiFillLock /> : <AiFillUnlock />}
          </button>
          <h1>{intervalManager.getTotalRemainingTime()}</h1>
          <button onClick={() => intervalManager.setRunning((prev) => !prev)}>
            {intervalManager.running ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>
        </div>
        <div className="grow text-center text-[20rem] md:text-[40rem] leading-none overflow-hidden">
          {intervalManager.getCurrentIntervalRemainingTime()}
        </div>
      </div>

      <div className="grow md:flex-grow-0 md:self-center md:h-5/6 overflow-scroll">
        {debugArray.map((interval, i) => {
          const { id, intervalType, time } = interval;
          return (
            <div
              key={id}
              className={clsx(
                "border-b-[1px] border-white text-center text-2xl md:text-4xl",
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
      <NavigationButtons
        setView={setView}
        gotoNextInterval={intervalManager.gotoNextInterval}
      />
      <audio preload="auto" src="/startWhistle.wav" ref={startWhistleRef} />
      <audio preload="auto" src="/beep.mp3" ref={beepRef} />
      <audio preload="auto" src="/endWhistle.mp3" ref={endWhistleRef} />
      <audio preload="auto" src="/endBell.mp3" ref={endBellRef} />
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
    <div className="md:hidden w-full flex justify-evenly gap-4 py-4 text-white text-4xl">
      <button>
        <FaStepBackward />
      </button>
      <button onClick={() => setView("home")}>
        <AiFillHome />
      </button>
      <button onClick={gotoNextInterval}>
        <FaStepForward />
      </button>
    </div>
  );
};

export default ActiveWorkout;
