"use client";
// SettingsPage.tsx
import React, { useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { messageStore } from "@/stores/messageStore";
import ProtectedRoute from "../components/protectedRoute";
import Header from "../components/Header";
import { deleteAllCodeItemsApi } from "@/firestore/codeItem/deleteAllCodeItems";
import userStore from "@/stores/userStore";

const SettingsPage: React.FC = () => {
  const [password, setPassword] = useState("");

  const handleDeleteAll = async () => {
    try {
      if (password === process.env.NEXT_PUBLIC_PAST_DELETION) {
        await deleteAllCodeItemsApi(userStore.user.uid);
        messageStore.setMessage({
          type: "success",
          text: "all codeItems deleted succesfully",
        });
      } else {
        throw new Error("passowrd is Wrong");
      }
    } catch (error: any) {
      console.log(error);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Settings</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete All Items
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default SettingsPage;
