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
  colorCount: { color: string; number: number }[];
};

const Header = ({ filter, dispatch, filteredWorkouts, colorCount }: Props) => {
  return (
    <>
      <div
        className="flex justify-between gap-4 bg-gray-400 px-4 py-4 text-white font-bold"
        style={{ backgroundColor: filter.color }}
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
              dispatch({ type: "TOGGLE", payload: { key: "expandedMenu" } })
            }
          >
            {!filter.expandedMenu ? <MdExpandMore /> : <MdExpandLess />}
          </Button>
          <Button>
            <MdSettings />
          </Button>
        </div>
      </div>
      {filter.expandedMenu && (
        <div
          className="flex justify-between px-4 py-2 bg-gray-400 text-white text-xl"
          style={{ backgroundColor: filter.color }}
        >
          <p>all</p>
          <div className="flex gap-6 text-2xl">
            <Button
              onClickEvent={() =>
                filter.color == ""
                  ? dispatch({
                      type: "TOGGLE",
                      payload: { key: "paletteVisible" },
                    })
                  : dispatch({
                      type: "UPDATE",
                      payload: { key: "color", value: "" },
                    })
              }
            >
              {filter.color != "" ? <BsPaletteFill /> : <BsPalette />}
            </Button>
            <Button
              onClickEvent={() =>
                dispatch({
                  type: "TOGGLE",
                  payload: { key: "filterFavorites" },
                })
              }
            >
              {filter.filterFavorites ? <BsStarFill /> : <BsStar />}
            </Button>
            <Button
              onClickEvent={() =>
                dispatch({
                  type: "TOGGLE",
                  payload: { key: "filterFavorites" },
                })
              }
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
          closePalette={() =>
            dispatch({
              type: "TOGGLE",
              payload: { key: "paletteVisible" },
            })
          }
          dispatch={dispatch}
          selectedColor={filter.filterByColor}
          closeOnSelect={true}
          displaySelection={false}
          displayNumbers={true}
          colors={colorCount}
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
