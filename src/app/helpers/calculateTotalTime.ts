type IntervalType = {
  id: string;
  intervalType: string;
  time: number;
}[];

const calculateTotalTime = (array: IntervalType, position: number = 0) => {
  let total = 0;
  array.forEach((interval, i) => {
    if (i >= position) total += interval.time;
  });
  return total;
};

export default calculateTotalTime;
