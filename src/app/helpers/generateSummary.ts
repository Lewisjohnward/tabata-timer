import calculateTotalTime from "./calculateTotalTime";
import generateArray from "./generateArray";
import convertTime from "./convertTime";
import calculateIntervals from "./calculateIntervals";

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
  // summaryObj = {
  // totals: [
  //    "Total: 0:35 . 15 intervals",
  //    "Work: 0:24 . 8 intervals",
  //    "Rest: 01:10 . 7 intervals",
  // ]
  // ,
  // summary : [
  // ]
  //}
  const { prepare, work, rest, cycles, sets, restBetweenSets, cooldown } =
    workout;

  const summaryObj: {
    numberOfSets: number | undefined;
    totals: string[];
    summary: string[];
  } = {
    numberOfSets: undefined,
    totals: [],
    summary: [],
  };

  const intervalArray = generateArray(workout);
  let totalTime = calculateTotalTime(intervalArray);

  let interval = 1;

  if (sets > 1) {
    summaryObj.numberOfSets = sets;
  }

  summaryObj.totals.push(
    `Total: ${convertTime(
      calculateTotalTime(intervalArray)
    )} - ${calculateIntervals(intervalArray)} intervals`
  );

  if (prepare > 0) {
    summaryObj.totals.push(
      `Prepare: ${convertTime(
        calculateTotalTime(intervalArray, "prepare")
      )} - ${calculateIntervals(intervalArray, "prepare")} intervals`
    );
  }
  summaryObj.totals.push(
    `Work: ${convertTime(
      calculateTotalTime(intervalArray, "work")
    )} - ${calculateIntervals(intervalArray, "work")} intervals`
  );

  if (rest > 0) {
    summaryObj.totals.push(
      `Rest: ${convertTime(
        calculateTotalTime(intervalArray, "rest")
      )} - ${calculateIntervals(intervalArray, "rest")} intervals`
    );
  }

  if (restBetweenSets > 0) {
    summaryObj.totals.push(
      `Rest between sets: ${convertTime(
        calculateTotalTime(intervalArray, "rest between sets")
      )} - ${calculateIntervals(intervalArray, "rest between sets")} intervals`
    );
  }

  if (cooldown > 0) {
    summaryObj.totals.push(
      `Cooldown: ${convertTime(
        calculateTotalTime(intervalArray, "cooldown")
      )} - ${calculateIntervals(intervalArray, "cooldown")} intervals`
    );
  }

  for (let set = 1; set <= sets; set++) {
    sets > 1 && summaryObj.summary.push(`Set: ${set}`);

    for (let cycle = 1; cycle <= cycles; cycle++) {
      cycles > 1 && summaryObj.summary.push(`Cycle: ${cycle}`);

      if (set == 1 && cycle == 1 && prepare != 0) {
        summaryObj.summary.push(
          `${interval++}. Prepare: ${prepare} - ${convertTime(totalTime)}`
        );
        totalTime -= prepare;
      }

      summaryObj.summary.push(
        `${interval++}. Work: ${work} - ${convertTime(totalTime)}`
      );
      totalTime -= work;

      if (
        (cycle != cycles && rest != 0) ||
        (cycle == cycles && set == sets && rest != 0)
      ) {
        summaryObj.summary.push(
          `${interval++}. Rest: ${rest} - ${convertTime(totalTime)}`
        );
        totalTime -= rest;
      }
    }
    if (restBetweenSets > 1 && set != sets) {
      summaryObj.summary.push(
        `${interval++}. Rest Between sets: ${restBetweenSets} - ${convertTime(
          totalTime
        )}`
      );
      totalTime -= restBetweenSets;
    }
  }

  if (cooldown != 0) {
    summaryObj.summary.push(
      `${interval++}. Cooldown: ${cooldown} - ${convertTime(totalTime)}`
    );
    totalTime -= cooldown;
  }
  summaryObj.summary.push(`Finish: - ${convertTime(totalTime)}`);

  return summaryObj;
};

export default generateSummary;
