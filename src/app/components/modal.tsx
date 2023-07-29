import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  closePortal: Function;
};

const Modal = ({ children, closePortal }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    //document.body.style.overflow = "hidden";
  }, []);

  return createPortal(
    <div
      className="absolute top-0 w-full h-screen flex justify-center items-center bg-black/20"
      onClick={() => closePortal()}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
