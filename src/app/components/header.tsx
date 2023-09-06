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
  filter: any;
  dispatch: React.Dispatch<any>;
  filteredWorkouts: any;
};

const Header = ({ filter, dispatch, filteredWorkouts }: Props) => {
  return (
    <>
      <div
        className="flex justify-between gap-4 bg-gray-400 px-4 py-4 text-white font-bold"
        style={{ backgroundColor: filter.filterByColor }}
      >
        <div className="space-y-4">
          <h1 className="text-2xl">Workouts: {filteredWorkouts.length}</h1>
        </div>
        <div className="flex gap-6 text-2xl">
          <Button>
            <AiOutlineSearch />
          </Button>
          <Button
            onClickEvent={() =>
              dispatch({ type: "TOGGLE", payload: { key: "sortFavorites" } })
            }
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
            <Button onClickEvent={filter.handleFilterFavorites}>
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
