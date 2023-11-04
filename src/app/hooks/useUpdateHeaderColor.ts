import { MutableRefObject, useEffect } from "react";

export const updateThemeColor = (color: string) => {
  const themeColor: HTMLMetaElement | null = document.querySelector(
    'meta[name="theme-color"]'
  );
  if (themeColor != null) themeColor.content = color;
};

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

      updateBackgroundColor(headerRef, color);
      updateThemeColor(color);
    }
  }
};

export const useUpdateHeaderColor = (
  workouts: WorkoutObj[],
  workoutsRef: MutableRefObject<HTMLDivElement | undefined>,
  headerRef: MutableRefObject<HTMLDivElement | null>
) => {
  const updateColor = () => {
    updateHeader(workoutsRef, headerRef);
  };

  const initColor = workouts.length != 0 ? workouts[0].color : "#aaaaaa";
  useEffect(() => {
    updateThemeColor(initColor);
    updateBackgroundColor(headerRef, initColor);
  }, []);
  return { initColor, updateColor };
};
