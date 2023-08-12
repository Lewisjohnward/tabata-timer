import calculateTotalTime from "./calculateTotalTime";
import generateArray from "./generateArray";
import convertTime from "./convertTime";

const generateSummary = (workout: {
  prepare: number;
  work: number;
  rest: number;
  cycles: number;
  sets: number;
  restBetweenSets: number;
  cooldown: number;
}) => {
  //const exampleObj = {
  //  totals: [
  //    "Total: 0:35 . 15 intervals",
  //    "Work: 0:24 . 8 intervals",
  //    "Rest: 01:10 . 7 intervals",
  //  ],
  //};
  const { prepare, work, rest, cycles, sets, restBetweenSets, cooldown } =
    workout;
  const arr = [];
  let totalTime = calculateTotalTime(
    generateArray({
      prepare,
      work,
      rest,
      cycles,
      sets,
      restBetweenSets,
      cooldown,
    })
  );
  let interval = 1;

  for (let set = 1; set <= sets; set++) {
    sets > 1 && arr.push(`Set: ${set}`);

    for (let cycle = 1; cycle <= cycles; cycle++) {
      cycles > 1 && arr.push(`Cycle: ${cycle}`);

      if (set == 1 && cycle == 1 && prepare != 0) {
        arr.push(
          `${interval++}.Prepare: ${prepare} - ${convertTime(totalTime)}`
        );
        totalTime -= prepare;
      }

      arr.push(`${interval++}.Work: ${work} - ${convertTime(totalTime)}`);
      totalTime -= work;

      if (
        (cycle != cycles && rest != 0) ||
        (cycle == cycles && set == sets && rest != 0)
      ) {
        arr.push(`${interval++}.Rest: ${rest} - ${convertTime(totalTime)}`);
        totalTime -= rest;
      }
    }
    if (restBetweenSets > 1 && set != sets) {
      arr.push(
        `${interval++}.Rest Between sets: ${restBetweenSets} - ${convertTime(
          totalTime
        )}`
      );
      totalTime -= restBetweenSets;
    }
  }

  if (cooldown != 0) {
    arr.push(`${interval++}.Cooldown: ${cooldown} - ${convertTime(totalTime)}`);
    totalTime -= cooldown;
  }
  arr.push(`Finish: - ${convertTime(totalTime)}`);

  return arr;
};

export default generateSummary;
