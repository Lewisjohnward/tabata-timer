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
  const timerRef = useRef();

  const decrementIntervalTime = () => {
    setCurrentIntervalTime((prev) => prev - 1);
    setRemainingTime((prev) => prev - 1);
  };

  const nextInterval = () => {
    const newIntervalPosition = intervalPosition + 1;
    setNewInterval(true);
    setCurrentIntervalTime(intervalArray[newIntervalPosition].time * 10);
    setIntervalPosition(newIntervalPosition);
    setColor(intervalArray[newIntervalPosition].intervalType);
  };

  const gotoNextInterval = () => {
    clearTimeout(timerRef.current);
    nextInterval();
  };

  const resetWorkout = () => {
    setRunning(false);
    setIntervalPosition(0);
    setCurrentIntervalTime(intervalArray[0].time * 10);
    setRemainingTime(calculateTotalTime(intervalArray) * 10);
  };

  const playASound = () => {
    currentIntervalTime == 30 && playBeep();
    currentIntervalTime == 20 && playBeep();
    currentIntervalTime == 10 && playBeep();

    currentIntervalTime == 0 && playEndBell();
    newInterval && playEndWhistle();
  };

  const playStartWhistle = () => startWhistleRef?.current?.play();
  const playEndWhistle = () => endWhistleRef?.current?.play();
  const playBeep = () => beepRef?.current?.play();
  const playEndBell = () => endBellRef?.current?.play();

  const handleTimerRunning = () => {
    playASound();
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
  };

  const handleChangeInterval = () => {
    /* change interval logic */
  };

  const getTotalRemainingTime = () => {
    return convertTime(Math.ceil(remainingTime / 10));
  };

  const getCurrentIntervalRemainingTime = () => {
    return Math.ceil(currentIntervalTime / 10);
  };

  useEffect(() => {
    setColor(getBackgroundColor(intervalArray[intervalPosition].intervalType));
  }, [intervalPosition]);

  useEffect(() => {
    timerRef.current = running && handleTimerRunning();
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
    gotoNextInterval,
    handleChangeInterval,
  };
};

export default useInterval;
