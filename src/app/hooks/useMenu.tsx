"use client";
import { MouseEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const useMenu = (
  user: string | undefined,
  workout: WorkoutObj,
  tabata: Tabata
) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [yPosition, setYPosition] = useState(0);
  const supabase = createClientComponentClient();

  const toggleMenu = (event: MouseEvent) => {
    const screenHeight = screen.height;
    const mousePosition = event.clientY;

    setYPosition(
      mousePosition + 440 > screenHeight ? mousePosition - 170 : mousePosition
    );
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    if (user) {
      tabata.setView("addworkout");
      tabata.setWorkoutToEdit(workout);
    } else {
      setDisplayModal(true);
    }
  };

  const handlePreview = () => {
    setMenuOpen(false);
    setSummaryOpen(true);
  };

  const handleActivateWorkout = () => {
    tabata.setView("activeworkout");
    tabata.setActiveWorkout(workout);
  };

  const duplicateWorkout = async () => {
    const { error } = await supabase
      .from("workouts")
      .insert({ ...workout, id: uuidv4() });
    console.log(error);
    const duplicateWorkout = { ...workout, id: uuidv4() };
    tabata.setWorkouts((prev: WorkoutObj[]) => [...prev, duplicateWorkout]);
  };

  const deleteWorkout = async () => {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workout.id);
    console.log(error);
    tabata.setWorkouts((prev: WorkoutObj[]) => {
      const filteredWorkouts = prev.filter(({ id }) => id != workout.id);
      return filteredWorkouts;
    });
  };

  const toggleFavorite = async () => {
    const { error } = await supabase
      .from("workouts")
      .update({ favourite: !workout.favourite })
      .eq("id", workout.id);
    console.log(error);

    tabata.setWorkouts((prev: WorkoutObj[]) => {
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
    displayModal,
    setDisplayModal,
  };
};

export default useMenu;
