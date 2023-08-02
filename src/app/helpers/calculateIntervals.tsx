type Workout = {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}[];

const calculateIntervals = (arr: Workout): number => {
  return arr.length;
};
export default calculateIntervals;
