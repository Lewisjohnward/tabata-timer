"use client";
import { MouseEvent, SetStateAction, useState } from "react";
import { WorkoutObj } from "../types/WorkoutObj";

const useMenu = (
  setView: React.Dispatch<SetStateAction<string>>,
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>,
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>,
  workout: WorkoutObj
) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [yPosition, setYPosition] = useState(0);

  const toggleMenu = (event: MouseEvent) => {
    const screenHeight = screen.height;
    const mousePosition = event.clientY;

    setYPosition(
      mousePosition + 440 > screenHeight ? mousePosition - 270 : mousePosition
    );
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    setView("addworkout");
    setWorkoutToEdit(workout);
  };

  const handlePreview = () => {
    setMenuOpen(false);
    setSummaryOpen(true);
  };

  const handleActivateWorkout = () => {
    setView("workout");
    setActiveWorkout(workout);
  };

  return {
    menuOpen,
    setMenuOpen,
    yPosition,
    setYPosition,
    toggleMenu,
    handleEdit,
    handlePreview,
    handleActivateWorkout,
    summaryOpen,
    setSummaryOpen,
  };
};

export default useMenu;
