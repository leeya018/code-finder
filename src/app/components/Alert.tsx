// components/MessageList.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "@/stores/messageStore";

const Alert: React.FC = () => {
  return (
    <>
      {messageStore.message?.text && (
        <div className="fixed bottom-0 right-0 left-0 py-5 bg-white shadow-lg rounded-lg z-50 w-full">
          <div
            className={`flex justify-center ${
              messageStore.message?.type === "error"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {" "}
            {messageStore.message?.text}
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Alert);
