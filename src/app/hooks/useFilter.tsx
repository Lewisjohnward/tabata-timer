"use client";
import { useReducer, useState } from "react";
import { WorkoutObj } from "../types/WorkoutObj";
import { colors } from "../misc/colors";

const filterInit = {
  filterByColor: "",
  optionsVisible: false,
  sortFavorites: false,
  expandedWorkouts: false,
  paletteVisible: false,
};

type Filter = {
  filterByColor: string;
  optionsVisible: boolean;
  sortFavorites: boolean;
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
        [key]: !value,
      };
    default:
      return filter;
  }
};

const useFilter = (workouts: WorkoutObj[]) => {
  const [filter, dispatch] = useReducer(reducer, filterInit);

  const handleFilterByColor = () => {
    setSortFavorites(false);
    if (filterByColor) {
      setFilterByColor("");
    } else {
      setPaletteVisible(true);
    }
  };

  const filteredWorkouts =
    filterByColor != ""
      ? workouts.filter(({ color }) => color == filterByColor)
      : sortFavorites
      ? workouts.filter(({ favourite }) => favourite)
      : workouts;

  const colorCount = colors.map((color) => {
    const number = workouts.filter((workout) => color == workout.color).length;
    return {
      color,
      number,
    };
  });

  const handleFilterFavorites = () => {
    setFilterByColor("");
    setSortFavorites((prev) => !prev);
  };

  return {
    filteredWorkouts,
    filter,
    dispatch,
  };
};

export default useFilter;
