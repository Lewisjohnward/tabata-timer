"use client";
import clsx from "clsx";
import { useState } from "react";
import AddWorkout from "./components/addWorkout";
import Home from "./components/home";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

export default function Page() {
  const [view, setView] = useState("home");

  return (
    <main className="relative min-h-full">
      {view == "home" ? (
        <Home setView={setView} />
      ) : view == "addworkout" ? (
        <AddWorkout setView={setView} />
      ) : view == "workout" ? (
        <Workout />
      ) : null}
    </main>
  );
}

const Workout = () => {
  const [locked, setLocked] = useState(false);
  const bg = "green";
  return (
    <div className={clsx("h-screen text-white", `bg-[${bg}]`)}>
      <div className="flex justify-center items-center gap-8 text-6xl font-bold">
        <button onClick={() => setLocked((prev) => !prev)}>
          {locked ? <AiFillLock /> : <AiFillUnlock />}
        </button>
        <h1 className="">Prepare</h1>
        <button>
          <BsFillPlayFill />
        </button>
      </div>
    </div>
  );
};
