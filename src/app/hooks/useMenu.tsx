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

  const handleActivateWorkout = () => {
    tabata.activateWorkout(workout.id);
  };

  const handleEdit = () => {
    if (user) tabata.editWorkout(workout.id);
    else setDisplayModal(true);
  };

  const duplicateWorkout = () => {
    if (user) tabata.duplicateWorkout(workout.id);
    else setDisplayModal(true);
  };
  const deleteWorkout = () => {
    if (user) tabata.deleteWorkout(workout.id);
    else setDisplayModal(true);
  };
  const toggleFavorite = () => {
    if (user) tabata.toggleFavorite(workout.id);
    else setDisplayModal(true);
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
