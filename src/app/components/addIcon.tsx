"use client";
import { useState, useEffect, SetStateAction } from "react";
import { AiOutlineOrderedList } from "@/misc/icons";
import clsx from "clsx";
import Link from "next/link";
import UserMessageModal from "./userMessageModal";
import { useStore } from "@/stores/useWorkoutsStore";

type Props = {
  user: string | undefined;
};

const AddIcon = ({ user }: Props) => {
  const { setView } = useStore();
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
          className={clsx("absolute h-full w-full top-0 left-0 bg-white/40")}
          onClick={() => setOpen(false)}
        />
      )}
      <div className="fixed right-1 bottom-1 md:bottom-2 space-y-2 text-white text-xl md:text-2xl">
        {open && (
          <div className="flex justify-between items-center gap-4 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200">
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
            "flex items-center gap-4 [&>*]:active:bg-white [&>*]:active:transition-colors [&>*]:active:duration-200"
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
            className="flex justify-center items-center w-20 h-20 bg-red-500 rounded-full text-4xl shadow-[1px_1px_1px_0px_rgba(0,0,0,0.4)] leading-none transition-transform duration-300"
            onClick={() => {
              open ? handleAddWorkout() : setOpen(true);
            }}
          >
            <div
              className={clsx(
                "w-10 h-10 transition-transform duration-300 leading-none",
                open && "rotate-180"
              )}
            >
              +
            </div>
          </button>
        </div>
      </div>
      {modalVisible && (
        <UserMessageModal
          closePortal={() => {
            setModalVisible(false);
            setOpen(false);
          }}
        >
          <p>Login to create new {newWorkout ? "workout" : "sequence"}</p>
          <Link
            href="/auth/login"
            className="bg-black/20 px-4 py-2 rounded shadow hover:bg-black/40"
          >
            Login/Sign up
          </Link>
        </UserMessageModal>
      )}
    </>
  );
};

export default AddIcon;
