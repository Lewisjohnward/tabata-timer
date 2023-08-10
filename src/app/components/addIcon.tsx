"use client";
import { useState, useEffect, SetStateAction } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import clsx from "clsx";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
};

const AddIcon = ({ setView }: Props) => {
  const [open, setOpen] = useState(false);

  const activateScroll = () => {
    document.body.style.overflow = "scroll";
  };

  const deactivateScroll = () => {
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    open ? deactivateScroll() : activateScroll();
  }, [open]);

  const handleAddWorkout = () => {
    activateScroll();
    setOpen(false);
    setView("addworkout");
  };

  return (
    <>
      {open && (
        <div
          className={clsx(
            "absolute h-[2000px] w-full top-0 left-0 bg-white/40"
          )}
          onClick={() => setOpen(false)}
        />
      )}
      <div className="fixed right-0 bottom-2 space-y-2 text-white text-2xl">
        {open && (
          <div className="flex justify-end items-center gap-4 pr-6 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200">
            <button
              className={clsx(
                "py-1 px-4 bg-red-500 rounded-full shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-entrance"
              )}
            >
              New Sequence
            </button>
            <button
              className={clsx(
                "flex justify-center items-center w-14 h-14 bg-red-500 rounded-full text-3xl shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-riseup"
              )}
            >
              <AiOutlineOrderedList />
            </button>
          </div>
        )}
        <div
          className={clsx(
            "flex justify-end items-center gap-4 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200 pr-[10px]"
          )}
        >
          {open && (
            <button
              className={clsx(
                "py-1 px-4 bg-red-500 rounded-full shadow-[1px_2px_2px_0px_rgba(0,0,0,0.2)] animate-entrance"
              )}
              onClick={handleAddWorkout}
            >
              New workout
            </button>
          )}
          <button
            className={clsx(
              "flex justify-center items-center w-20 h-20 bg-red-500 rounded-full text-4xl shadow-[1px_1px_1px_0px_rgba(0,0,0,0.4)]"
            )}
            onClick={() => {
              open ? handleAddWorkout() : setOpen(true);
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default AddIcon;
