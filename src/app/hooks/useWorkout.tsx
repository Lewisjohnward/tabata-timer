"use client";
import { useReducer } from "react";
import calculateIntervals from "@/helpers/calculateIntervals";
import calculateTotalTime from "@/helpers/calculateTotalTime";
import generateArray from "@/helpers/generateArray";
import { v4 as uuidv4 } from "uuid";
import { colors } from "@/misc/colors";

type Payload = {
  key: keyof WorkoutObj;
  value?: number | string;
};

type Action = {
  type: string;
  payload: Payload;
};

const reducer = (state: WorkoutObj, action: Action) => {
  const {
    type,
    payload: { key, value },
  } = action;
  switch (type) {
    case "UPDATE":
      state = {
        ...state,
        [key]: value,
      };
      break;
    case "INCREMENT":
      state = {
        ...state,
        [key]: (state[key] as number) + 1,
      };
      break;
    case "DECREMENT":
      state = {
        ...state,
        [key]: (state[key] as number) - 1,
      };
      break;
    default:
      return state;
  }
  return calculateIntervalsTime(state);
};

const calculateIntervalsTime = (workout: WorkoutObj) => {
  const workoutArray = generateArray(workout);
  workout.totalTime = calculateTotalTime(workoutArray);
  workout.intervals = calculateIntervals(workoutArray);
  return workout;
};

const initWorkout = (workout: WorkoutObj) => {
  if (workout.id === "0") {
    workout.id = uuidv4();
    workout.color = colors[Math.floor(Math.random() * colors.length)];
  }

  return calculateIntervalsTime(workout);
};

const useCreateWorkout = (workout: WorkoutObj) => {
  const [state, dispatch] = useReducer(reducer, workout, initWorkout);

  return {
    state,
    dispatch,
  };
};

export default useCreateWorkout;
