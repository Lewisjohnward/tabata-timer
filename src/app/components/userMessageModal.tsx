import { ReactNode } from "react";
import Modal from "./modal";

const UserMessageModal = ({ children }: { children: ReactNode }) => {
  return (
    <Modal closePortal={() => ""}>
      <div className="w-full h-full flex justify-center items-center bg-black/20">
        <div className="flex flex-col items-center gap-4 bg-white p-10 rounded shadow-lg">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default UserMessageModal;
