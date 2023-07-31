"use client";
import { useEffect, useState } from "react";
import generateSummary from "../helpers/generateSummary";
import calculateIntervals from "../helpers/calculateIntervals";
import { SummaryType } from "../components/types";

const useCreateWorkout = () => {
  const [title, setTitle] = useState("Bicep curls");
  const [prepare, setPrepare] = useState(10);
  const [work, setWork] = useState(25);
  const [rest, setRest] = useState(60);
  const [cycles, setCycles] = useState(1);
  const [sets, setSets] = useState(1);
  const [restBetweenSets, setRestBetweenSets] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  //const [totalTime, setTotalTime] = useState(0)
  const [intervals, setIntervals] = useState(0);
  const [summary, setSummary] = useState<SummaryType[]>([]);
  //    {
  //        prepare: 10,
  //        work: 25,
  //        rest: 10
  //    },
  //    {
  //        work: 25,
  //        rest: 10
  //    },
  //    {
  //        work: 25
  //    }

  //]

  useEffect(() => {
    const totalIntervals = calculateIntervals(
      prepare,
      rest,
      cooldown,
      cycles,
      sets
    );
    setSummary(
      generateSummary(
        prepare,
        work,
        rest,
        cycles,
        sets,
        //restBetweenSets,
        cooldown
      )
    );

    setIntervals(totalIntervals);
  }, [prepare, work, rest, cycles, sets, rest, cooldown]);

  useEffect(() => {
    console.log(summary);
  }, [summary]);

  return {
    title,
    setTitle,
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
  };
};

export default useCreateWorkout;
