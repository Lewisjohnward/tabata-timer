type IntervalArr = {
  id: string;
  intervalType: string;
  time: number;
}[];

const calculateIntervals = (intervalArr: IntervalArr, type = "all") => {
  if (type == "prepare") {
    return intervalArr.filter(({ intervalType }) => intervalType == "prepare")
      .length;
  } else if (type == "work") {
    return intervalArr.filter(({ intervalType }) => intervalType == "work")
      .length;
  } else if (type == "rest") {
    return intervalArr.filter(({ intervalType }) => intervalType == "rest")
      .length;
  } else if (type == "rest between sets") {
    return intervalArr.filter(
      ({ intervalType }) => intervalType == "rest between sets"
    ).length;
  } else if (type == "cooldown") {
    return intervalArr.filter(({ intervalType }) => intervalType == "cooldown")
      .length;
  } else return intervalArr.length;
};
export default calculateIntervals;
