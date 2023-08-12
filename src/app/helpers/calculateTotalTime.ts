type IntervalType = {
  id: string;
  intervalType: string;
  time: number;
}[];

const calculateTotalTime = (
  array: IntervalType,
  type: string = "all",
  position: number = 0
) => {
  let total = 0;
  if (type == "prepare") {
    array.forEach(({ intervalType, time }) => {
      if (intervalType == "prepare") {
        total += time;
      }
    });
    return total;
  } else if (type == "work") {
    array.forEach(({ intervalType, time }) => {
      if (intervalType == "work") {
        total += time;
      }
    });
    return total;
  } else if (type == "rest") {
    array.forEach(({ intervalType, time }) => {
      if (intervalType == "rest") {
        total += time;
      }
    });
    return total;
  } else if (type == "restbetweensets") {
    array.forEach(({ intervalType, time }) => {
      if (intervalType == "rest between sets") {
        total += time;
      }
    });
  } else if (type == "cooldown") {
    array.forEach(({ intervalType, time }) => {
      if (intervalType == "cooldown") {
        total += time;
      }
    });
  } else {
    array.forEach((interval, i) => {
      if (i >= position) total += interval.time;
    });
  }
  return total;
};

export default calculateTotalTime;
