"use client";
import { MouseEvent, useState } from "react";

const useMenu = (
  user: string | undefined,
  workout: WorkoutObj,
  tabata: Tabata
) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [yPosition, setYPosition] = useState(0);

  const toggleMenu = (event: MouseEvent) => {
    const screenHeight = screen.height;
    const mousePosition = event.clientY;
    setYPosition(
      mousePosition + 440 > screenHeight ? mousePosition - 170 : mousePosition
    );
    setMenuOpen((prev) => !prev);
  };

  const handlePreview = () => {
    setMenuOpen(false);
    setSummaryOpen(true);
  };

  const handleEdit = () => {
    if (user) tabata.editWorkout(workout.id);
    else setDisplayModal(true);
  };

  const handleActivateWorkout = () => {
    tabata.activateWorkout(workout.id);
  };

  const duplicateWorkout = () => {
    tabata.duplicateWorkout(workout.id);
  };
  const deleteWorkout = () => {
    tabata.deleteWorkout(workout.id);
  };
  const toggleFavorite = () => {
    tabata.toggleFavorite(workout.id);
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
    displayModal,
    setDisplayModal,
  };
};

export default useMenu;
