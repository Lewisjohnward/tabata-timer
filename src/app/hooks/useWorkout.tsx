"use client";
import {useEffect, useState} from "react";
import calculateIntervals from "../helpers/calculateIntervals";
import calculateTotalTime from "../helpers/calculateTotalTime";
import generateArray from "../helpers/generateArray";
import {v4 as uuidv4} from "uuid";
import {colors} from "../misc/colors";

const random = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)]
}

const useCreateWorkout = () => {
    const id = uuidv4()
    const [title, setTitle] = useState("Bicep curls");
    const [color, setColor] = useState(random(colors))
    const [prepare, setPrepare] = useState(10);
    const [work, setWork] = useState(25);
    const [rest, setRest] = useState(60);
    const [cycles, setCycles] = useState(1);
    const [sets, setSets] = useState(1);
    const [restBetweenSets, setRestBetweenSets] = useState(0);
    const [cooldown, setCooldown] = useState(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [intervals, setIntervals] = useState(0);

    useEffect(() => {
        const arr = generateArray(
            prepare,
            work,
            rest,
            cycles,
            sets,
            restBetweenSets,
            cooldown
        );
        setIntervals(calculateIntervals(arr));
        setTotalTime(calculateTotalTime(arr));
    }, [prepare, work, rest, cycles, sets, rest, cooldown, restBetweenSets]);

    return {
        id,
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
    };
};

export default useCreateWorkout;
