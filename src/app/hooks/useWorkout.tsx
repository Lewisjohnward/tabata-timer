"use client";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
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

const workoutTemplate = {
  id: uuidv4(),
  title: "Bicep curls",
  favourite: false,
  totalTime: 0,
  intervals: 0,
  color: random(colors),
  prepare: 10,
  work: 30,
  rest: 10,
  cycles: 1,
  sets: 1,
  restBetweenSets: 0,
  cooldown: 10,
};

type Key = "prepare" | "work";

type Action =
  | {
      type: "update";
      payload: { key: Key; value: string | number };
    }
  | { type: "increment"; payload: { key: Key } }
  | { type: "decrement"; payload: { key: Key } };

const reducer = (state: WorkoutObj, action: Action) => {
  const {
    payload: { key },
  } = action;
  switch (action.type) {
    case "update":
      return { ...state, [key]: action.payload.value };
    case "increment":
      return { ...state, [key]: state[key] + 1 };
    case "decrement":
      return { ...state, [key]: state[key] - 1 };
    default:
      return state;
  }
};

const useCreateWorkout = (workoutToEdit: WorkoutObj | null) => {
  const [state, dispatch] = useReducer(
    reducer,
    workoutToEdit || workoutTemplate
  );

  const inputAction = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

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
    state,
    dispatch,
    inputAction,
  };
};

export default useCreateWorkout;
