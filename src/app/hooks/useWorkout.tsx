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

const defaultWorkout = {
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

const useCreateWorkout = (workoutToEdit: WorkoutObj | null) => {
  const [state, dispatch] = useReducer(
    reducer,
    workoutToEdit || defaultWorkout,
    calculateIntervalsTime
  );

  const summary = generateSummary(state);

  return {
    state,
    dispatch,
    summary,
  };
};

export default useCreateWorkout;
