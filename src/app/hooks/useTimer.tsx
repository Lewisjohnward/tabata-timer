"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import convertTime from "../helpers/convertTime";
import generateArray from "../helpers/generateArray";
import calculateTotalTime from "../helpers/calculateTotalTime";
import { WorkoutObj } from "../types/Workout";

const getBackgroundColor = (intervalType: string) => {
  switch (intervalType) {
    case "prepare":
      return "#15803d";
    case "work":
      return "#b91c1c";
    case "rest":
      return "#4dc0e3";
    case "cooldown":
    case "rest between sets":
      return "#0284c7";
    default:
      return "#ffffff";
  }
};

const calculateNextPosition = (
  intervalPosition: number,
  length: number,
  direction: "forwards" | "backwards"
) => {
  switch (direction) {
    case "forwards":
      return intervalPosition + 1 <= length - 1 ? intervalPosition + 1 : 0;
    case "backwards":
      return intervalPosition - 1 >= 0 ? intervalPosition - 1 : length - 1;
  }
};

const useInterval = (
  workoutObj: WorkoutObj,
  startWhistleRef: RefObject<HTMLAudioElement>,
  beepRef: RefObject<HTMLAudioElement>,
  endWhistleRef: RefObject<HTMLAudioElement>,
  endBellRef: RefObject<HTMLAudioElement>
) => {
  const intervalArray = generateArray(workoutObj);
  const [remainingTime, setRemainingTime] = useState(
    calculateTotalTime(intervalArray)
  );
  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [intervalPosition, setIntervalPosition] = useState(0);
  const [isStartOfNewInterval, setIsStartOfNewInterval] = useState(false);
  const [color, setColor] = useState(
    getBackgroundColor(intervalArray[intervalPosition].intervalType)
  );
  const [currentIntervalTime, setCurrentIntervalTime] = useState(
    intervalArray[0].time
  );
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const decrementIntervalTime = () => {
    setCurrentIntervalTime((prev) => prev - 1);
    setRemainingTime((prev) => prev - 1);
  };

  const nextInterval = () => {
    clearTimeout(timerRef.current);
    const newIntervalPosition = calculateNextPosition(
      intervalPosition,
      intervalArray.length,
      "forwards"
    );
    updateIntervalPosition(newIntervalPosition);
  };

  const previousInterval = () => {
    clearTimeout(timerRef.current);
    const newIntervalPosition = calculateNextPosition(
      intervalPosition,
      intervalArray.length,
      "backwards"
    );
    updateIntervalPosition(newIntervalPosition);
  };

  const handleChangeInterval = (position: number) => {
    clearTimeout(timerRef.current);
    updateIntervalPosition(position);
  };

  const updateIntervalPosition = (position: number) => {
    setIsStartOfNewInterval(true);
    setCurrentIntervalTime(intervalArray[position].time);
    setIntervalPosition(position);
    setColor(intervalArray[position].intervalType);
  };

  const calculateTimeLeft = () => {
    setRemainingTime(calculateTotalTime(intervalArray, intervalPosition));
  };

  const resetWorkout = () => {
    setRunning(false);
    setIntervalPosition(0);
    setCurrentIntervalTime(intervalArray[0].time);
    setRemainingTime(calculateTotalTime(intervalArray));
  };

  const playSound = () => {
    const { intervalType } = intervalArray[intervalPosition];
    currentIntervalTime == 3 && playBeep();
    currentIntervalTime == 2 && playBeep();
    currentIntervalTime == 1 && playBeep();

    currentIntervalTime == 0 && intervalType == "work" && playEndBell();

    isStartOfNewInterval && intervalType == "work" && playStartWhistle();
  };

  const playStartWhistle = () => endWhistleRef?.current?.play();
  const playBeep = () => beepRef?.current?.play();
  const playEndBell = () => endBellRef?.current?.play();

  const handleTimerRunning = () => {
    playSound();
    if (isStartOfNewInterval) setIsStartOfNewInterval(false);
    if (currentIntervalTime > 0) return setTimeout(decrementIntervalTime, 1000);
    if (intervalPosition == intervalArray.length - 1)
      return setTimeout(resetWorkout, 1000);
    nextInterval();
  };

  const getTotalRemainingTime = () => {
    return convertTime(remainingTime);
  };

  const getCurrentIntervalRemainingTime = () => {
    return currentIntervalTime;
  };

  const getIntervalPosition = () => {
    return `${intervalPosition + 1} / ${intervalArray.length}`;
  };

  const handleToggleRunning = () => {
    if (running) clearInterval(timerRef.current);
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    setColor(getBackgroundColor(intervalArray[intervalPosition].intervalType));
    calculateTimeLeft();
  }, [intervalPosition]);

  useEffect(() => {
    if (running) {
      timerRef.current = handleTimerRunning();
    }
  }, [running, currentIntervalTime]);

  useEffect(() => {
    startWhistleRef?.current?.load();
  }, [startWhistleRef]);

  return {
    locked,
    setLocked,
    running,
    setRunning,
    intervalPosition,
    setIntervalPosition,
    color,
    getCurrentIntervalRemainingTime,
    getTotalRemainingTime,
    getIntervalPosition,
    nextInterval,
    previousInterval,
    handleChangeInterval,
    handleToggleRunning,
    intervalArray,
  };
};

export default useInterval;
