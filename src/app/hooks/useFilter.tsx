"use client";
import { useState } from "react";
import { WorkoutObj } from "../types/WorkoutObj";
import { colors } from "../misc/colors";
const useFilter = (workouts: WorkoutObj[]) => {
  const [filterByColor, setFilterByColor] = useState("");
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

  const filteredWorkouts =
    filterByColor == ""
      ? workouts
      : workouts.filter(({ color }) => color == filterByColor);

  const colorCount = colors.map((color) => {
    const number = workouts.filter((workout) => color == workout.color).length;
    return {
      color,
      number,
    };
  });

  return {
    filterByColor,
    setFilterByColor,
    filteredWorkouts,
    optionsVisible,
    setOptionsVisible,
    sortFavorites,
    setSortFavorites,
    expandedWorkouts,
    setExpandedWorkouts,
    paletteVisible,
    setPaletteVisible,
    handleFilterByColor,
    colorCount,
  };
};

export default useFilter;
