import { MutableRefObject, useEffect } from "react";
import { updateThemeColor } from "@/helpers/updateThemeColor";

const updateBackgroundColor = (
  ref: MutableRefObject<HTMLDivElement | null>,
  color: string
) => {
  if (!ref.current) return;
  ref.current.style.backgroundColor = color;
};

const updateHeader = (
  workoutsRef: MutableRefObject<HTMLDivElement | undefined>,
  headerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const divs = workoutsRef.current?.children;
  const header = headerRef.current;
  const headerHeight = header?.getBoundingClientRect().bottom;
  if (!headerHeight || !divs) return;
  for (let i = 0; i < divs.length; i++) {
    const top = divs[i].getBoundingClientRect().top;
    const bottom = divs[i].getBoundingClientRect().bottom;
    if (top <= headerHeight && bottom >= headerHeight) {
      const div = divs[i].children[0] as HTMLDivElement;
      const color = div.style.backgroundColor;
      return color;
    }
  }
};

export const useHeaderColor = (
  workouts: WorkoutObj[],
  workoutsRef: MutableRefObject<HTMLDivElement | undefined>,
  headerRef: MutableRefObject<HTMLDivElement | null>,
  color: string,
  btnReturnToTopRef: MutableRefObject<HTMLButtonElement | null>
) => {
  const updateColor = () => {
    const color = updateHeader(workoutsRef, headerRef);
    console.log(color);
    if (!color) return;
    updateBackgroundColor(headerRef, color);
    updateThemeColor(color);
    if (!btnReturnToTopRef.current) return;
    btnReturnToTopRef.current.style.backgroundColor = color;
  };

  const initColor =
    workouts.length != 0 ? workouts[0].color : color ? color : "#0891b2";
  useEffect(() => {
    updateThemeColor(initColor);
    updateBackgroundColor(headerRef, initColor);
  }, []);

  return { initColor, updateColor };
};
