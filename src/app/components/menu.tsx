"use client";
import { BsFillPencilFill } from "react-icons/bs";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillEye,
  AiFillSetting,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Modal from "./modal";
import { FaStickyNote } from "react-icons/fa";
import { WorkoutObj } from "../types/WorkoutObj";
import { SetStateAction } from "react";

const MenuItem = ({
  children,
  mouseEvent,
}: {
  children: any;
  mouseEvent?: () => void;
}) => {
  return (
    <button
      className="flex items-center w-full gap-2 px-2 text-xl text-sky-900 rounded hover:bg-black/10"
      onClick={mouseEvent}
    >
      {children}
    </button>
  );
};

const Menu = ({
  closeMenu,
  yPosition,
  handleEdit,
  handlePreview,
  duplicateWorkout,
  deleteWorkout,
  toggleFavorite,
}: {
  closeMenu: () => void;
  yPosition: number;
  handleEdit: () => void;
  handlePreview: () => void;
  duplicateWorkout: () => void;
  deleteWorkout: () => void;
  toggleFavorite: () => void;
}) => {
  return (
    <Modal closePortal={closeMenu}>
      <div
        className="absolute right-10 bg-white p-4 space-y-2 shadow rounded-md text-black"
        style={{ top: yPosition }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem mouseEvent={handleEdit}>
          <BsFillPencilFill />
          <p>Edit</p>
        </MenuItem>
        <MenuItem mouseEvent={handlePreview}>
          <AiFillEye />
          <p>Preview</p>
        </MenuItem>
        <MenuItem>
          <AiFillSetting />
          <p>Settings</p>
        </MenuItem>
        <MenuItem>
          <FaStickyNote />
          <p>Notes</p>
        </MenuItem>
        <MenuItem mouseEvent={toggleFavorite}>
          <AiOutlineStar />
          <AiFillStar />
          <p>Favorite</p>
        </MenuItem>
        <MenuItem mouseEvent={duplicateWorkout}>
          <AiFillCopy />
          <p>Copy</p>
        </MenuItem>
        <MenuItem mouseEvent={deleteWorkout}>
          <AiFillDelete />
          <p>Delete</p>
        </MenuItem>
      </div>
    </Modal>
  );
};

export default Menu;
