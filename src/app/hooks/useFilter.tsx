"use client";
import { useReducer, useState } from "react";
import { WorkoutObj } from "../types/WorkoutObj";
import { colors } from "../misc/colors";

const filterInit = {
  color: "",
  expandedMenu: false,
  filterFavorites: false,
  expandedWorkouts: false,
  paletteVisible: false,
  colorCount: {},
};

type Filter = {
  color: string;
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
    default:
      return filter;
  }
};

const useFilter = (workouts: WorkoutObj[]) => {
  const [filter, dispatch] = useReducer(reducer, filterInit);

  const filteredWorkouts =
    filter.color != ""
      ? workouts.filter(({ color }) => color == filter.color)
      : filter.filterFavorites
      ? workouts.filter(({ favourite }) => favourite)
      : workouts;

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
