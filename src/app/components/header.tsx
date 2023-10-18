"use client";
import Link from "next/link";
import { ReactNode, SetStateAction } from "react";
import Palette from "./palette";
import {
  AiOutlineSearch,
  BsArrowsCollapse,
  BsArrowsExpand,
  BsPalette,
  BsPaletteFill,
  BsStar,
  BsStarFill,
  MdExpandLess,
  MdExpandMore,
  MdSettings,
} from "@/misc/icons";

const SearchBar = ({ dispatch }: { dispatch: any }) => {
  const handleInput = (e: any) => {
    dispatch({
      type: "UPDATE",
      payload: { key: "filterString", value: e.target.value },
    });
  };

  return (
    <div className="flex items-center px-2 bg-white rounded cursor-pointer">
      <button>
        <AiOutlineSearch className="text-gray-400" />
      </button>
      <input
        type="text"
        onChange={handleInput}
        className="text-md text-gray-400 outline-none"
      />
    </div>
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

type Props = {
  filter: any;
  dispatch: React.Dispatch<any>;
  filteredWorkouts: any;
  colorCount: { color: string; number: number }[];
  user: string | undefined;
};

const Header = ({
  filter,
  dispatch,
  filteredWorkouts,
  colorCount,
  user,
}: Props) => {
  return (
    <>
      <div
        className="flex justify-between gap-2 bg-gray-400 px-2 py-4 lg:px-20 text-white"
        style={{ backgroundColor: filter.color }}
      >
        <div className="flex items-center space-y-4">
          <h1 className="text-xl">Workouts: {filteredWorkouts.length}</h1>
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <p className="text-md">{`Hey, ${user}!`}</p>
              <form action="/api/auth/sign-out" method="post">
                <button className="relative bg-black/20 rounded px-4 py-2">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="bg-black/20 px-4 py-2 rounded shadow hover:bg-black/40"
            >
              Login/Sign up
            </Link>
          )}
          <Button
            onClickEvent={() =>
              dispatch({ type: "TOGGLE", payload: { key: "expandedMenu" } })
            }
          >
            {!filter.expandedMenu ? <MdExpandMore /> : <MdExpandLess />}
          </Button>
        </div>
      </div>
      {filter.expandedMenu && (
        <div
          className="flex justify-end gap-4 px-4 py-2 bg-gray-400 text-white text-xl lg:pr-20"
          style={{ backgroundColor: filter.color }}
        >
          <SearchBar dispatch={dispatch} />
          <div className="flex gap-6 text-2xl">
            <Link href="/settings">
              <MdSettings />
            </Link>
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
                  payload: { key: "expandedWorkouts" },
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

export default Header;
