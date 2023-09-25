"use client";
import { MouseEvent, SetStateAction, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

const useMenu = (
  user: string | undefined,
  setView: React.Dispatch<SetStateAction<string>>,
  setActiveWorkout: React.Dispatch<SetStateAction<WorkoutObj>>,
  setWorkoutToEdit: React.Dispatch<SetStateAction<WorkoutObj | null>>,
  workout: WorkoutObj,
  setWorkouts: React.Dispatch<SetStateAction<WorkoutObj[]>>
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
      mousePosition + 440 > screenHeight ? mousePosition - 270 : mousePosition
    );
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    if (user) {
      setView("addworkout");
      setWorkoutToEdit(workout);
    } else {
      setDisplayModal(true);
    }
  };

  const handlePreview = () => {
    setMenuOpen(false);
    setSummaryOpen(true);
  };

  const handleActivateWorkout = () => {
    setView("activeworkout");
    setActiveWorkout(workout);
  };

  const duplicateWorkout = async () => {
    const { error } = await supabase
      .from("workouts")
      .insert({ ...workout, id: uuidv4() });
    console.log(error);
    const duplicateWorkout = { ...workout, id: uuidv4() };
    setWorkouts((prev) => [...prev, duplicateWorkout]);
  };

  const deleteWorkout = async () => {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workout.id);
    console.log(error);
    setWorkouts((prev) => {
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
    displayModal,
    setDisplayModal,
  };
};

export default useMenu;
