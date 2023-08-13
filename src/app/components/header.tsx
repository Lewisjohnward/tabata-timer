"use client";
import { ReactNode, SetStateAction, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsArrowsCollapse,
  BsArrowsExpand,
  BsPalette,
  BsPaletteFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";

import { MdExpandLess, MdExpandMore, MdSettings } from "react-icons/md";
import Palette from "./palette";

type Props = {
  workoutCount: number;
  filterByColor: string;
  setFilterByColor: React.Dispatch<SetStateAction<string>>;
};

const Header = ({ workoutCount, filterByColor, setFilterByColor }: Props) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [sortFavorites, setSortFavorites] = useState(false);
  const [expandedWorkouts, setExpandedWorkouts] = useState(false);
  const [paletteVisible, setPaletteVisible] = useState(false);

  const handleFilterByColor = () => {
    if (filterByColor) {
      setFilterByColor("");
    } else {
      setPaletteVisible(true);
    }
  };
  return (
    <>
      <div
        className="flex justify-between gap-4 bg-gray-400 px-4 py-4 text-white font-bold"
        style={{ backgroundColor: filterByColor }}
      >
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
        <div
          className="flex justify-between px-4 py-2 bg-gray-400 text-white text-xl"
          style={{ backgroundColor: filterByColor }}
        >
          <p>all</p>
          <div className="flex gap-6 text-2xl">
            <Button onClickEvent={handleFilterByColor}>
              {filterByColor ? <BsPaletteFill /> : <BsPalette />}
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
      {paletteVisible && (
        <Palette
          setPaletteVisible={setPaletteVisible}
          setColor={setFilterByColor}
          selectedColor={filterByColor}
          closeOnSelect={true}
          displaySelection={false}
        />
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
