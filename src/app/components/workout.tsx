"use client";
import { useState } from "react";
import clsx from "clsx";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

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

export default Workout;
