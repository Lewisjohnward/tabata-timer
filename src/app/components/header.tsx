"use client";
import { ReactNode, SetStateAction, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsPalette,
  BsStar,
  BsStarFill,
} from "react-icons/bs";

import { MdExpandLess, MdExpandMore, MdSettings } from "react-icons/md";

type Props = {
  workoutCount: number;
};

const Header = ({ workoutCount }: Props) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [sortFavorites, setSortFavorites] = useState(false);
  const [expandedWorkouts, setExpandedWorkouts] = useState(false);
  return (
    <>
      <div className="flex justify-between gap-4 bg-gray-400 px-4 py-4 text-white font-bold">
        <div className="space-y-4">
          <h1 className="text-2xl">Workouts: {workoutCount}</h1>
        </div>
        <div className="flex gap-6 text-2xl">
          <Button>
            <AiOutlineSearch />
          </Button>
          <Button onClickEvent={() => setOptionsVisible((prev) => !prev)}>
            {!optionsVisible ? <MdExpandMore /> : <MdExpandLess />}
          </Button>
          <Button>
            <MdSettings />
          </Button>
        </div>
      </div>
      {optionsVisible && (
        <div className="flex justify-between px-4 py-2 bg-gray-400 text-white text-xl">
          <p>all</p>
          <div className="flex gap-6 text-2xl">
            <Button>
              <BsPalette />
            </Button>
            <Button onClickEvent={() => setSortFavorites((prev) => !prev)}>
              {sortFavorites ? <BsStarFill /> : <BsStar />}
            </Button>
            <Button onClickEvent={() => setExpandedWorkouts((prev) => !prev)}>
              {!expandedWorkouts ? <BsArrowsExpand /> : <BsArrowsCollapse />}
            </Button>
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
  onClickEvent?: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="hover:text-white/40"
      onClick={() => onClickEvent != undefined && onClickEvent(true)}
    >
      {children}
    </button>
  );
};

export default Header;
