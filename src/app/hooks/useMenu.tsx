"use client";
import { MouseEvent, SetStateAction, useState } from "react";
import { WorkoutObj } from "../types/WorkoutObj";
import { v4 as uuidv4 } from "uuid";

const useMenu = (
  setView: React.Dispatch<SetStateAction<string>>,
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>,
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>,
  workout: WorkoutObj,
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>
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

  const duplicateWorkout = () => {
    const duplicateWorkout = { ...workout, id: uuidv4() };
    setWorkouts((prev) => [...prev, duplicateWorkout]);
  };

  const deleteWorkout = () => {
    setWorkouts((prev) => {
      const filteredWorkouts = prev.filter(({ id }) => id != workout.id);
      return filteredWorkouts;
    });
  };

  const toggleFavorite = () => {
    setWorkouts((prev) => {
      const updatedArr = prev.map((d) => {
        if (d.id == workout.id) {
          return { ...workout, favourite: !workout.favourite };
        } else return d;
      });
      return updatedArr;
    });
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
    duplicateWorkout,
    deleteWorkout,
    toggleFavorite,
  };
};

export default useMenu;
