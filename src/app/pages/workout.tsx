"use client";
import clsx from "clsx";
import { useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
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

const Workout = ({ setView }: HomeProps) => {
  const [locked, setLocked] = useState(false);
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
          <h1 className="">Prepare</h1>
          <button>
            <BsFillPlayFill />
          </button>
        </div>
        <div className="text-center text-[15rem]">10</div>
      </div>

      <div className="h-[400px] overflow-scroll">
        {workout.map((d, i) => {
          const key = Object.keys(d)[0];
          const value = d[key as keyof typeof d];
          return (
            <div
              className={clsx(
                "border-b-[1px] border-white text-center text-4xl",
                i == 0 && "bg-green-800 rounded"
              )}
            >
              <button className="py-2 w-full rounded hover:bg-black/30">
                {i + 1}. {key}: {value}
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
