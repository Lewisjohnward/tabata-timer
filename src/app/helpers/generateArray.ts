import { v4 as uuidv4 } from "uuid";

const generateArray = (workout: {
  prepare: number;
  work: number;
  rest: number;
  cycles: number;
  sets: number;
  restBetweenSets: number;
  cooldown: number;
}) => {
  const { prepare, work, rest, cycles, sets, restBetweenSets, cooldown } =
    workout;
  const arr = [];

  if (prepare != 0)
    arr.push({
      id: uuidv4(),
      intervalType: "prepare",
      time: prepare,
    });

  for (let set = 1; set <= sets; set++) {
    for (let cycle = 1; cycle <= cycles; cycle++) {
      arr.push({
        id: uuidv4(),
        intervalType: "work",
        time: work,
      });

      if (
        (cycle != cycles && rest != 0) ||
        (cycle == cycles && set == sets && rest != 0)
      )
        arr.push({
          id: uuidv4(),
          intervalType: "rest",
          time: rest,
        });
    }
    if (restBetweenSets > 0 && set != sets) {
      arr.push({
        id: uuidv4(),
        intervalType: "rest between sets",
        time: restBetweenSets,
      });
    }
  }

  if (cooldown != 0)
    arr.push({
      id: uuidv4(),
      intervalType: "cooldown",
      time: cooldown,
    });
  return arr;
};

export default generateArray;
