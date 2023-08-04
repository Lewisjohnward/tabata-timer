const generateArray = (
  prepare: number,
  work: number,
  rest: number,
  cycles: number,
  sets: number,
  restBetweenSets: number,
  cooldown: number
) => {
  const arr = [];
  if (prepare != 0) arr.push({ prepare });
  for (let set = 1; set <= sets; set++) {
    for (let cycle = 1; cycle <= cycles; cycle++) {
      arr.push({ work });
      if (cycle != cycles && rest != 0) arr.push({ rest });
      if (restBetweenSets && set != sets) arr.push({ restBetweenSets });
    }
  }
  if (cooldown != 0) arr.push({ cooldown });
  console.log(arr);
  return arr;
};

export default generateArray;
