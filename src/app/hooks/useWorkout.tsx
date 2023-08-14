"use client";
import { useEffect, useState } from "react";
import calculateIntervals from "../helpers/calculateIntervals";
import calculateTotalTime from "../helpers/calculateTotalTime";
import generateArray from "../helpers/generateArray";
import { v4 as uuidv4 } from "uuid";
import { colors } from "../misc/colors";
import generateSummary from "../helpers/generateSummary";
import { WorkoutObj } from "../types/WorkoutObj";

const random = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const useCreateWorkout = (workoutToEdit: WorkoutObj | null) => {
  const id = workoutToEdit?.id || uuidv4();
  const [title, setTitle] = useState(workoutToEdit?.title || "Bicep curls");
  const [color, setColor] = useState(workoutToEdit?.color || random(colors));
  const [prepare, setPrepare] = useState(workoutToEdit?.prepare || 10);
  const [work, setWork] = useState(workoutToEdit?.work || 25);
  const [rest, setRest] = useState(workoutToEdit?.rest || 60);
  const [cycles, setCycles] = useState(workoutToEdit?.cycles || 1);
  const [sets, setSets] = useState(workoutToEdit?.sets || 1);
  const [restBetweenSets, setRestBetweenSets] = useState(
    workoutToEdit?.restBetweenSets || 0
  );
  const [cooldown, setCooldown] = useState(workoutToEdit?.cooldown || 10);
  const [totalTime, setTotalTime] = useState<number>(
    workoutToEdit?.totalTime || 0
  );
  const [intervals, setIntervals] = useState(workoutToEdit?.intervals || 0);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const arr = generateArray({
      prepare,
      work,
      rest,
      cycles,
      sets,
      restBetweenSets,
      cooldown,
    });
    setSummary(
      generateSummary({
        prepare,
        work,
        rest,
        cycles,
        sets,
        restBetweenSets,
        cooldown,
      })
    );
    setIntervals(calculateIntervals(arr));
    setTotalTime(calculateTotalTime(arr));
  }, [prepare, work, rest, cycles, sets, rest, cooldown, restBetweenSets]);

  const createWorkoutObject = () => {
    return {
      id,
      title,
      favourite: false,
      color,
      totalTime: !totalTime ? 0 : totalTime,
      intervals,
      prepare,
      work,
      rest,
      cycles,
      sets,
      restBetweenSets,
      cooldown,
    };
  };

  return {
    title,
    setTitle,
    color,
    setColor,
    prepare,
    setPrepare,
    work,
    setWork,
    rest,
    setRest,
    cycles,
    setCycles,
    sets,
    setSets,
    restBetweenSets,
    setRestBetweenSets,
    cooldown,
    setCooldown,
    intervals,
    totalTime,
    createWorkoutObject,
    summary,
  };
};

export default useCreateWorkout;
