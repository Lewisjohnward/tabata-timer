"use client";
import { RefObject, useEffect, useState } from "react";

type IntervalType = {
  id: string;
  description?: string;
  intervalType: string;
  time: number;
}[];

const getTimeRemaining = (array: IntervalType) => {
  let total = 0;
  array.forEach((interval) => (total += interval.time));
  return total;
};

const getBackgroundColor = (type: string) => {
  switch (type) {
    case "prepare":
      return "green";
    case "work":
      return "red";
    case "rest":
      return "#4dc0e3";
    case "cooldown":
      return "#4de3de";
    default:
      return "#ffffff";
  }
};

const useInterval = (
  intervalArray: IntervalType,
  whistleRef: RefObject<HTMLAudioElement>
) => {
  const [remainingTime, setRemainingTime] = useState(
    getTimeRemaining(intervalArray) * 10
  );
  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [intervalPosition, setIntervalPosition] = useState(0);
  const [newInterval, setNewInterval] = useState(false);
  const [color, setColor] = useState(
    getBackgroundColor(intervalArray[0].intervalType)
  );

  const [currentIntervalTime, setCurrentIntervalTime] = useState(
    intervalArray[0].time * 10
  );

  const decrementIntervalTime = () => {
    setCurrentIntervalTime((prev) => prev - 1);
    setRemainingTime((prev) => prev - 1);
  };

  const startIntervalSound = () => {
    decrementIntervalTime();
    playWhistle();
  };

  const playWhistle = () => whistleRef?.current?.play();

  const nextInterval = () => {
    const newIntervalPosition = intervalPosition + 1;
    setNewInterval(true);
    setCurrentIntervalTime(intervalArray[newIntervalPosition].time * 10);
    setIntervalPosition(newIntervalPosition);
    setColor(intervalArray[newIntervalPosition].intervalType);
  };

  const resetWorkout = () => {
    setRunning(false);
    setIntervalPosition(0);
    setCurrentIntervalTime(intervalArray[0].time * 10);
    setRemainingTime(getTimeRemaining(intervalArray) * 10);
  };

  const handleTimerRunning = () => {
    if (newInterval) {
      setNewInterval(false);
      return setTimeout(startIntervalSound, 500);
    }
    if (currentIntervalTime != 0) {
      return setTimeout(decrementIntervalTime, 100);
    }
    if (intervalPosition != intervalArray.length - 1) {
      return setTimeout(nextInterval, 1000);
    }
    resetWorkout();
  };

  useEffect(() => {
    running && handleTimerRunning();
  }, [running, currentIntervalTime]);

  useEffect(() => {
    whistleRef?.current?.load();
  }, [whistleRef]);

  return {
    locked,
    setLocked,
    running,
    setRunning,
    intervalPosition,
    setIntervalPosition,
    currentIntervalTime,
    color,
    remainingTime,
  };
};

export default useInterval;
