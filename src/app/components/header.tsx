"use client";
import { ReactNode, SetStateAction } from "react";
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
import { WorkoutObj } from "../types/WorkoutObj";
import Palette from "./palette";

type Props = {
  filter: {
    filterByColor: string;
    setFilterByColor: React.Dispatch<SetStateAction<string>>;
    filteredWorkouts: WorkoutObj[];
    optionsVisible: boolean;
    setOptionsVisible: React.Dispatch<SetStateAction<boolean>>;
    sortFavorites: boolean;
    setSortFavorites: React.Dispatch<SetStateAction<boolean>>;
    expandedWorkouts: boolean;
    setExpandedWorkouts: React.Dispatch<SetStateAction<boolean>>;
    paletteVisible: boolean;
    setPaletteVisible: React.Dispatch<SetStateAction<boolean>>;
    handleFilterByColor: () => void;
    colorCount: { color: string; number: any }[];
  };
};

const Header = ({ filter }: Props) => {
  return (
    <>
      <div
        className="flex justify-between gap-4 bg-gray-400 px-4 py-4 text-white font-bold"
        style={{ backgroundColor: filter.filterByColor }}
      >
        <div className="space-y-4">
          <h1 className="text-2xl">
            Workouts: {filter.filteredWorkouts.length}
          </h1>
        </div>
        <div className="flex gap-6 text-2xl">
          <Button>
            <AiOutlineSearch />
          </Button>
          <Button
            onClickEvent={() => filter.setOptionsVisible((prev) => !prev)}
          >
            {!filter.optionsVisible ? <MdExpandMore /> : <MdExpandLess />}
          </Button>
          <Button>
            <MdSettings />
          </Button>
        </div>
      </div>
      {filter.optionsVisible && (
        <div
          className="flex justify-between px-4 py-2 bg-gray-400 text-white text-xl"
          style={{ backgroundColor: filter.filterByColor }}
        >
          <p>all</p>
          <div className="flex gap-6 text-2xl">
            <Button onClickEvent={filter.handleFilterByColor}>
              {filter.filterByColor ? <BsPaletteFill /> : <BsPalette />}
            </Button>
            <Button
              onClickEvent={() => filter.setSortFavorites((prev) => !prev)}
            >
              {filter.sortFavorites ? <BsStarFill /> : <BsStar />}
            </Button>
            <Button
              onClickEvent={() => filter.setExpandedWorkouts((prev) => !prev)}
            >
              {!filter.expandedWorkouts ? (
                <BsArrowsExpand />
              ) : (
                <BsArrowsCollapse />
              )}
            </Button>
          </div>
        </div>
      )}
      {filter.paletteVisible && (
        <Palette
          setPaletteVisible={filter.setPaletteVisible}
          setColor={filter.setFilterByColor}
          selectedColor={filter.filterByColor}
          closeOnSelect={true}
          displaySelection={false}
          displayNumbers={true}
          colors={filter.colorCount}
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
