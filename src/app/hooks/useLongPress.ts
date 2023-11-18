import React, { useCallback, useRef, useState } from "react";

export const useLongPress = (
  onClick: () => void,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const longPressTimeout = useRef<NodeJS.Timeout>();
  const target = useRef<HTMLButtonElement>();

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        target.current = event.target as HTMLButtonElement;
        target.current.addEventListener("touchend", preventDefault, {
          passive: false,
        });
      }
      timeout.current = setTimeout(() => {
        onClickCallback();
        setLongPressTriggered(true);
      }, delay);
    },
    [onClick, delay, shouldPreventDefault]
  );

  const onClickCallback = () => {
    longPressTimeout.current = setTimeout(() => {
      onClick();
      onClickCallback();
    }, 100);
  };

  const clear = useCallback(
    (_: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        clearTimeout(longPressTimeout.current);
      }
      shouldTriggerClick && !longPressTriggered && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
};

const isTouchEvent = (event: TouchEvent) => {
  return "touches" in event;
};

const preventDefault = (event: TouchEvent) => {
  if (!isTouchEvent(event)) return;
  const { touches } = event as TouchEvent;
  if (touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};
