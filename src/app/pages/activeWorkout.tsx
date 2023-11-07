"use client";
import { SetStateAction, useRef } from "react";
import clsx from "clsx";
import {
  AiFillHome,
  AiFillLock,
  AiFillUnlock,
  BsFillPlayFill,
  BsFillPauseFill,
  FaStepBackward,
  FaStepForward,
} from "@/misc/icons";
import useInterval from "@/hooks/useTimer";
import UserMessageModal from "@/components/userMessageModal";

type Props = {
  tabata: Tabata;
};

const ActiveWorkout = ({ tabata }: Props) => {
  const startWhistleRef = useRef<HTMLAudioElement>(null);
  const beepRef = useRef<HTMLAudioElement>(null);
  const endWhistleRef = useRef<HTMLAudioElement>(null);
  const endBellRef = useRef<HTMLAudioElement>(null);

  const intervalManager = useInterval(
    tabata.activeWorkout,
    startWhistleRef,
    beepRef,
    endWhistleRef,
    endBellRef
  );

  return (
    <>
      <div
        className="relative flex flex-col gap-5 text-white p-4 h-[100dvh] lg:flex-row lg:justify-center lg:items-center lg:gap-10"
        style={{ backgroundColor: intervalManager.color }}
      >
        <CurrentInterval intervalManager={intervalManager} />
        <div className="hidden lg:block bg-white w-[1px] h-3/6" />
        <IntervalList
          intervals={intervalManager.intervalArray}
          intervalManager={intervalManager}
        />
        <div className="lg:hidden w-full flex justify-evenly gap-4 py-4 text-white text-4xl">
          <NavigationButtons
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
      {intervalManager.confirmExit && (
        <UserMessageModal>
          <p>Are you sure you want to exit current workout?</p>
          <div className="flex gap-8">
            <button
              className="bg-green-500 rounded-md py-2 px-4 text-white"
              onClick={() => tabata.setView("home")}
            >
              Yes
            </button>
            <button
              onClick={() => intervalManager.setConfirmExit(false)}
              className="bg-red-500 rounded-md py-2 px-4 text-white"
            >
              No
            </button>
          </div>
        </UserMessageModal>
      )}
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
    setConfirmExit: React.Dispatch<SetStateAction<boolean>>;
  };
};

const CurrentInterval = ({ intervalManager }: CurrentIntervalProps) => {
  return (
    <div className="flex flex-col justify-evenly lg:gap-10">
      <div className="flex justify-evenly items-center gap-8 text-4xl lg:text-6xl font-bold">
        <button onClick={() => intervalManager.setLocked((prev) => !prev)}>
          {intervalManager.locked ? <AiFillLock /> : <AiFillUnlock />}
        </button>
        <h1 className="w-36 px-4 lg:w-48">
          {intervalManager.getTotalRemainingTime()}
        </h1>
        <button onClick={() => intervalManager.setConfirmExit(true)}>
          <AiFillHome />
        </button>
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

const NavigationButtons = ({
  nextInterval,
  previousInterval,
  intervalPosition,
}: {
  nextInterval: () => void;
  previousInterval: () => void;
  intervalPosition: string;
}) => {
  return (
    <>
      <button onClick={previousInterval}>
        <FaStepBackward />
      </button>
      <p className="lg:w-48 text-center">{intervalPosition}</p>
      <button onClick={nextInterval}>
        <FaStepForward />
      </button>
    </>
  );
};

export default ActiveWorkout;
