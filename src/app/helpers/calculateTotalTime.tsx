type Workout = {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}[];

const calculateTotalTime = (arr: Workout) => {
  let total = 0;
  arr.forEach((d) => {
    const key = Object.keys(d)[0];
    const val = d[key as keyof typeof d];
    if (val != undefined) total += val;
  });

  return total;
};

export default calculateTotalTime;
