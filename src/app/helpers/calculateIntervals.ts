type Workout = {
  id: string;
  intervalType: string;
  time: number;
}[];

const calculateIntervals = (arr: Workout): number => {
  return arr.length;
};
export default calculateIntervals;
