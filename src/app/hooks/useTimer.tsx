"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import convertTime from "../helpers/convertTime";

type IntervalType = {
  id: string;
  description?: string;
  intervalType: string;
  time: number;
}[];

const calculateTotalTime = (array: IntervalType) => {
  let total = 0;
  array.forEach((interval) => (total += interval.time));
  return total;
};

const getBackgroundColor = (intervalType: string) => {
  switch (intervalType) {
    case "prepare":
      return "#15803d";
    case "work":
      return "#b91c1c";
    case "rest":
      return "#4dc0e3";
    case "cooldown":
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
      return intervalPosition + 1 < length - 1 ? intervalPosition + 1 : 0;
    case "backwards":
      return intervalPosition - 1 >= 0 ? intervalPosition - 1 : length - 1;
  }
};

const useInterval = (
  intervalArray: IntervalType,
  startWhistleRef: RefObject<HTMLAudioElement>,
  beepRef: RefObject<HTMLAudioElement>,
  endWhistleRef: RefObject<HTMLAudioElement>,
  endBellRef: RefObject<HTMLAudioElement>
) => {
  const [remainingTime, setRemainingTime] = useState(
    calculateTotalTime(intervalArray) * 10
  );
  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [intervalPosition, setIntervalPosition] = useState(0);
  const [newInterval, setNewInterval] = useState(false);
  const [color, setColor] = useState(
    getBackgroundColor(intervalArray[intervalPosition].intervalType)
  );
  const [currentIntervalTime, setCurrentIntervalTime] = useState(
    intervalArray[0].time * 10
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
    setNewInterval(true);
    setCurrentIntervalTime(intervalArray[position].time * 10);
    setIntervalPosition(position);
    setColor(intervalArray[position].intervalType);
  };

  const resetWorkout = () => {
    setRunning(false);
    setIntervalPosition(0);
    setCurrentIntervalTime(intervalArray[0].time * 10);
    setRemainingTime(calculateTotalTime(intervalArray) * 10);
  };

  const playSound = () => {
    const { intervalType } = intervalArray[intervalPosition];
    currentIntervalTime == 30 && playBeep();
    currentIntervalTime == 20 && playBeep();
    currentIntervalTime == 10 && playBeep();

    currentIntervalTime == 0 && intervalType == "work" && playEndBell();

    newInterval && intervalType == "work" && playStartWhistle();
  };

  const playStartWhistle = () => endWhistleRef?.current?.play();
  const playBeep = () => beepRef?.current?.play();
  const playEndBell = () => endBellRef?.current?.play();

  const handleTimerRunning = () => {
    playSound();
    if (newInterval) {
      setNewInterval(false);
      return setTimeout(decrementIntervalTime, 500);
    }
    if (currentIntervalTime != 0) {
      return setTimeout(decrementIntervalTime, 100);
    }
    if (intervalPosition != intervalArray.length - 1) {
      return setTimeout(nextInterval, 1000);
    }
    resetWorkout();
    return undefined;
  };

  const getTotalRemainingTime = () => {
    return convertTime(Math.ceil(remainingTime / 10));
  };

  const getCurrentIntervalRemainingTime = () => {
    return Math.ceil(currentIntervalTime / 10);
  };

  const getIntervalPosition = () => {
    return `${intervalPosition + 1} / ${intervalArray.length}`;
  };

  useEffect(() => {
    setColor(getBackgroundColor(intervalArray[intervalPosition].intervalType));
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
  };
};

export default useInterval;
