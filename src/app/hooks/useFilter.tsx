"use client";
import { useReducer } from "react";
import { colors } from "@/misc/colors";

const filterInit = {
  color: "",
  filterString: "",
  expandedMenu: false,
  filterFavorites: false,
  expandedWorkouts: false,
  paletteVisible: false,
  colorCount: {},
};

type Filter = {
  color: string;
  filterString: string;
  expandedMenu: boolean;
  filterFavorites: boolean;
  expandedWorkouts: boolean;
  paletteVisible: boolean;
};

type Payload = {
  key: keyof Filter;
  value?: boolean | string;
};

type Action = {
  type: string;
  payload: Payload;
};

const reducer = (filter: Filter, action: Action) => {
  const {
    type,
    payload: { key, value },
  } = action;
  switch (type) {
    case "TOGGLE":
      return {
        ...filter,
        [key]: !filter[key],
      };
    case "UPDATE":
      return {
        ...filter,
        [key]: value,
      };
    case "SEARCH":
      console.log("SEARCH");
      return filter;
    default:
      return filter;
  }
};

const filterWorkouts = (filter: Filter, workouts: WorkoutObj[]) => {
  return filter.color != ""
    ? workouts.filter(({ color }) => color == filter.color)
    : filter.filterFavorites
    ? workouts.filter(({ favourite }) => favourite)
    : filter.filterString != ""
    ? workouts
    : workouts;
};

const useFilter = (workouts: WorkoutObj[]) => {
  const [filter, dispatch] = useReducer(reducer, filterInit);

  const filteredWorkouts = filterWorkouts(filter, workouts);

  const colorCount = colors.map((color) => {
    const number = workouts.filter((workout) => color == workout.color).length;
    return {
      color,
      number,
    };
  });

  return {
    filteredWorkouts,
    colorCount,
    filter,
    dispatch,
  };
};

export default useFilter;
