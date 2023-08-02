"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HomeProps } from "../components/types";

type Workout = {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}[];

const workout: Workout = [
  { prepare: 10 },
  { work: 25 },
  { rest: 60 },
  { work: 60 },
  { rest: 25 },
  { work: 60 },
  { rest: 25 },
  { work: 60 },
  { rest: 25 },
  { work: 60 },
  { rest: 25 },
  { work: 60 },
  { rest: 25 },
  { work: 60 },
  { rest: 25 },
  { cooldown: 5 },
];

const getIntervalDetails = (interval: {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}) => {
  const key = Object.keys(interval)[0];
  return { time: interval[key as keyof typeof interval], intervalType: key };
};

const Workout = ({ setView }: HomeProps) => {
  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(
    getIntervalDetails(workout[0])
  );

  const bg = "green";
  return (
    <div
      className="relative h-screen p-4 text-white pt-4 space-y-4"
      style={{ backgroundColor: `${bg}` }}
    >
      <div className="space-y-10">
        <div className="flex justify-center items-center gap-8 text-6xl font-bold">
          <button onClick={() => setLocked((prev) => !prev)}>
            {locked ? <AiFillLock /> : <AiFillUnlock />}
          </button>
          <h1 className="">{currentInterval.intervalType}</h1>
          <button onClick={() => setRunning((prev) => !prev)}>
            {running ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>
        </div>
        <div className="text-center text-[15rem]">{currentInterval.time}</div>
      </div>

      <div className="h-[400px] overflow-scroll">
        {workout.map((d, i) => {
          const { intervalType, time } = getIntervalDetails(d);
          return (
            <div
              className={clsx(
                "border-b-[1px] border-white text-center text-4xl",
                i == 0 && "bg-green-800 rounded"
              )}
            >
              <button className="py-2 w-full rounded hover:bg-black/30">
                {i + 1}. {intervalType}: {time}
              </button>
            </div>
          );
        })}
      </div>

      <button
        className="absolute top-0 right-10 w-14 h-14 bg-white text-black rounded-lg shadow hover:bg-gray-200"
        onClick={() => setView("home")}
      >
        Home
      </button>
    </div>
  );
};

export default Workout;
