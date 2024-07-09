// components/MessageList.tsx
import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "@/stores/messageStore";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
};
const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Modal);
