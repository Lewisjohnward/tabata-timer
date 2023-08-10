type Workout = {
  id: string;
  intervalType: string;
  time: number;
}[];

const calculateTotalTime = (arr: Workout) => {
  let total = 0;
  arr.forEach((d) => {
    total += d.time;
  });

  return total;
};

export default calculateTotalTime;
