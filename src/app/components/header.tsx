"use client";
import { ReactNode, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsPalette,
  BsStar,
  BsStarFill,
} from "react-icons/bs";

import { CiSettings } from "react-icons/ci";
import { FaExpand } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const IconArr = [<AiOutlineSearch />, <MdExpandLess />, <CiSettings />];

type Props = {
  workoutCount: number;
};

const Header = ({ workoutCount }: Props) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [sortFavorites, setSortFavorites] = useState(false);
  const [expandedWorkouts, setExpandedWorkouts] = useState(false);
  return (
    <>
      <div className="flex justify-between gap-4 bg-gray-400 px-4 py-2 text-white font-bold">
        <div className="space-y-4">
          <h1 className="text-2xl">Workouts: {workoutCount}</h1>
        </div>
        <div className="flex gap-6 text-2xl">
          <button>
            <AiOutlineSearch />
          </button>
          <Button onClickEvent={() => setOptionsVisible((prev) => !prev)}>
            {!optionsVisible ? <MdExpandMore /> : <MdExpandLess />}
          </Button>
          <button>
            <CiSettings />
          </button>
        </div>
      </div>
      {optionsVisible && (
        <div className="flex justify-between px-4 py-2 bg-gray-400 text-white text-xl">
          <p>all</p>
          <div className="flex gap-6 text-2xl">
            <button>
              <BsPalette />
            </button>
            <button onClick={() => setSortFavorites((prev) => !prev)}>
              {sortFavorites ? <BsStarFill /> : <BsStar />}
            </button>
            <button onClick={() => setExpandedWorkouts((prev) => !prev)}>
              {!expandedWorkouts ? <BsArrowsExpand /> : <BsArrowsCollapse />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Button = ({
  children,
  onClickEvent,
}: {
  children: ReactNode;
  onClickEvent: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return <button onClick={() => onClickEvent(true)}>{children}</button>;
};

export default Header;
