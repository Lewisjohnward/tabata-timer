import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  closePortal: Function;
};

const Modal = ({ children, closePortal }: Props) => {
  document.body.style.overflow = "hidden";

  const close = () => {
    document.body.style.overflow = "scroll";
    closePortal();
  };

  return createPortal(
    <div
      className="absolute top-0 w-full h-screen flex justify-center items-center"
      onClick={close}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
