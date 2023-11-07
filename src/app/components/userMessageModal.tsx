import { ReactNode } from "react";
import Modal from "@/components/modal";

const UserMessageModal = ({
  children,
  closePortal,
}: {
  children: ReactNode;
  closePortal?: () => void;
}) => {
  return (
    <Modal closePortal={closePortal}>
      <div className="w-full h-full flex justify-center items-center bg-black/20 p-4">
        <div className="flex flex-col items-center gap-4 bg-white p-10 rounded shadow-lg">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default UserMessageModal;
