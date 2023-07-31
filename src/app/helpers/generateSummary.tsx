import { SummaryType } from "../components/types";

type CycleType = {
  set?: number;
  cycle?: number;
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
};

const generateSummary = (
  prepare: number,
  work: number,
  rest: number,
  cycles: number,
  sets: number,
  //restBetweenSets: number,
  cooldown: number
) => {
  const arr: SummaryType[] = [];
  for (let set = 1; set <= sets; set++) {
    for (let cycle = 1; cycle <= cycles; cycle++) {
      const cycleObject: CycleType = {};
      if (cycles > 1) cycleObject.cycle = cycle;
      if (sets > 1) cycleObject.set = set;
      if (cycle == 1) {
        if (prepare && set == 1) cycleObject.prepare = prepare;
        cycleObject.work = work;
        if (rest) cycleObject.rest = rest;
      }
      if (cycle != 1 && cycle < cycles) {
        cycleObject.work = work;
        if (rest) cycleObject.rest = rest;
      }

      if (cycle == cycles) {
        cycleObject.work = work;
        if (rest) cycleObject.rest = rest;
        if (cooldown) cycleObject.cooldown = cooldown;
      }
      arr.push(cycleObject);
    }
  }

  return arr;
};
export default generateSummary;
