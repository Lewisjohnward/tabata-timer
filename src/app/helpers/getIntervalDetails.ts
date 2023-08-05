const getIntervalDetails = (interval: {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}) => {
  const key = Object.keys(interval)[0];
  return { time: interval[key as keyof typeof interval], intervalType: key };
};

export default getIntervalDetails;
