"use client";
import { useState, useEffect, SetStateAction } from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import clsx from "clsx";
import Modal from "./modal";
import Link from "next/link";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  user: string | undefined;
};

const AddIcon = ({ setView, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWorkout, setNewWorkout] = useState(true);

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
    if (user) {
      activateScroll();
      setOpen(false);
      setView("addworkout");
    } else {
      setModalVisible(true);
      setNewWorkout(true);
    }
  };

  const handleCreateSequence = () => {
    if (user) {
      /* Add create sequence logic here */
      activateScroll();
      //setOpen(false);
      //setView("addworkout");
    } else {
      setModalVisible(true);
      setNewWorkout(false);
    }
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
              onClick={handleCreateSequence}
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
      {modalVisible && (
        <Modal
          closePortal={() => {
            setModalVisible(false);
            setOpen(false);
          }}
        >
          <div className="w-full h-full flex justify-center items-center bg-black/20">
            <div className="flex flex-col items-center gap-4 bg-white p-10 rounded shadow-lg">
              Login to create new {newWorkout ? "workout" : "sequence"}
              <Link
                href="/login"
                className="bg-black/20 px-4 py-2 rounded shadow hover:bg-black/40"
              >
                Login/Sign up
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddIcon;
