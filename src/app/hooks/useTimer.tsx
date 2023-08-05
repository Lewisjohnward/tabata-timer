"use client";
import { useState } from "react";
const useTimer = () => {
  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [intervalPosition, setIntervalPosition] = useState(0);
  return {
    locked,
    setLocked,
    running,
    setRunning,
    intervalPosition,
    setIntervalPosition,
  };
};

export default useTimer;
