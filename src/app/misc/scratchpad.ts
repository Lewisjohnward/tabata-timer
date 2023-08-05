const [currentInterval, setCurrentInterval] = useState(
  getIntervalDetails(intervalArray[timer.intervalPosition])
);

const stopTimer = () => {
  timer.setRunning(false);
};

const decrementIntervalTime = () => {
  let { time, intervalType } = currentInterval;
  time!--;
  if (time != 0) {
    return setCurrentInterval({ intervalType, time });
  }

  if (timer.intervalPosition + 1 == intervalArray.length) {
    setCurrentInterval({ intervalType, time });
    return stopTimer();
  }

  let newPosition = timer.intervalPosition + 1;
  setCurrentInterval(getIntervalDetails(intervalArray[newPosition]));
  timer.setIntervalPosition(newPosition);
};

const handleChangeInterval = (position: number) => {
  setCurrentInterval(getIntervalDetails(intervalArray[position]));
  timer.setIntervalPosition(position);
};

const getBackgroundColor = () => {
  switch (currentInterval.intervalType) {
    case "prepare":
      return "green";
    case "work":
      return "red";
    case "rest":
      return "#4dc0e3";
    case "cooldown":
      return "#4de3de";
  }
};

useEffect(() => {
  timer.running && setTimeout(decrementIntervalTime, 1000);
}, [timer.running, currentInterval]);
