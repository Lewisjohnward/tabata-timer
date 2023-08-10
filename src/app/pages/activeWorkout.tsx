"use client";
import clsx from "clsx";
import { SetStateAction, useRef } from "react";
import { AiFillHome, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import generateArray from "../helpers/generateArray";
import useInterval from "../hooks/useTimer";
import { WorkoutObj } from "../types/WorkoutObj";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  workout: WorkoutObj;
};

const ActiveWorkout = ({ setView, workout }: Props) => {
  const startWhistleRef = useRef<HTMLAudioElement>(null);
  const beepRef = useRef<HTMLAudioElement>(null);
  const endWhistleRef = useRef<HTMLAudioElement>(null);
  const endBellRef = useRef<HTMLAudioElement>(null);

  const intervalManager = useInterval(
    workout,
    startWhistleRef,
    beepRef,
    endWhistleRef,
    endBellRef
  );

  return (
    <div
      className="relative flex flex-col gap-5 text-white p-4 h-screen lg:flex-row lg:justify-center lg:items-center lg:gap-10"
      style={{ backgroundColor: intervalManager.color }}
    >
      <CurrentInterval setView={setView} intervalManager={intervalManager} />
      <div className="hidden lg:block bg-white w-[1px] h-3/6" />
      <IntervalList
        intervals={intervalManager.intervalArray}
        intervalManager={intervalManager}
      />
      <div className="lg:hidden w-full flex justify-evenly gap-4 py-4 text-white text-4xl">
        <NavigationButtons
          setView={setView}
          nextInterval={intervalManager.nextInterval}
          previousInterval={intervalManager.previousInterval}
          intervalPosition={intervalManager.getIntervalPosition()}
        />
      </div>
      <audio preload="auto" src="/startWhistle.wav" ref={startWhistleRef} />
      <audio preload="auto" src="/beep.mp3" ref={beepRef} />
      <audio preload="auto" src="/endWhistle.mp3" ref={endWhistleRef} />
      <audio preload="auto" src="/endBell.mp3" ref={endBellRef} />
    </div>
  );
};

const NavigationButtons = ({
  setView,
  nextInterval,
  previousInterval,
  intervalPosition,
}: {
  setView: React.Dispatch<SetStateAction<string>>;
  nextInterval: () => void;
  previousInterval: () => void;
  intervalPosition: string;
}) => {
  return (
    <>
      <button onClick={previousInterval}>
        <FaStepBackward />
      </button>
      <button className="lg:w-48" onClick={() => setView("home")}>
        {intervalPosition}
      </button>
      <button onClick={nextInterval}>
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
    getIntervalPosition: () => string;
    setRunning: React.Dispatch<SetStateAction<boolean>>;
    running: boolean;
    getCurrentIntervalRemainingTime: () => number;
    nextInterval: () => void;
    previousInterval: () => void;
    handleToggleRunning: () => void;
  };
  setView: React.Dispatch<SetStateAction<string>>;
};

const CurrentInterval = ({
  intervalManager,
  setView,
}: CurrentIntervalProps) => {
  return (
    <div className="flex flex-col justify-evenly lg:gap-10">
      <div className="flex justify-evenly items-center gap-8 text-4xl lg:text-6xl font-bold">
        <button onClick={() => intervalManager.setLocked((prev) => !prev)}>
          {intervalManager.locked ? <AiFillLock /> : <AiFillUnlock />}
        </button>
        <h1 className="w-36 px-4 lg:w-48">
          {intervalManager.getTotalRemainingTime()}
        </h1>
        <button onClick={intervalManager.handleToggleRunning}>
          {intervalManager.running ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
      </div>

      <div className="text-center text-[7rem] md:text-[10rem] lg:text-[15rem] leading-none">
        {intervalManager.getCurrentIntervalRemainingTime()}
      </div>
      <div className="hidden w-full lg:flex justify-evenly gap-4 py-4 text-white text-4xl">
        <NavigationButtons
          previousInterval={intervalManager.previousInterval}
          setView={setView}
          nextInterval={intervalManager.nextInterval}
          intervalPosition={intervalManager.getIntervalPosition()}
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
    handleChangeInterval: (i: number) => void;
  };
};

const IntervalList = ({ intervals, intervalManager }: IntervalListProps) => {
  return (
    <div className="overflow-scroll lg:h-1/2">
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
              onClick={() => intervalManager.handleChangeInterval(i)}
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
