// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { CodeItem } from "@/interfaces/CodeItem";

import CodeListItems from "./components/CodeListItems";
import Filter from "./components/Filter";
import { messageStore } from "@/stores/messageStore";
import { observer } from "mobx-react-lite";
import ProtectedRoute from "./components/protectedRoute";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { ModalStore } from "@/stores/modalStore";
import { modals } from "@/util";
import { getCodeItemsApi } from "@/firestore/codeItem/getCodeItems";
import userStore from "@/stores/userStore";
import { addCodeItemApi } from "@/firestore/codeItem/addCodeItem";
import { deleteCodeItemApi } from "@/firestore/codeItem/deleteCodeItem";
import { updateCodeItemApi } from "@/firestore/codeItem/updateCodeItem";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<CodeItem[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<CodeItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userStore.user) {
      getCodeItemsApi(userStore.user.uid)
        .then((codeItems) => {
          setEntries(codeItems);
          setFilteredEntries(codeItems);
          messageStore.setMessage({
            type: "success",
            text: "fetch codeItems succesfully",
          });
          setIsLoading(false);
        })
        .catch((e: any) => {
          console.log(e);
          messageStore.setMessage({ type: "error", text: e.message });
        });
      setIsLoading(false);
    }
  }, []);

  const handleFormSubmit = async (data: CodeItem) => {
    try {
      const docId = await addCodeItemApi(userStore.user.uid, data);
      console.log({ id: docId, ...data });
      console.log(entries);
      setFilteredEntries((prev) => [...prev, { id: docId, ...data }]);
      // setIsFormModalOpen(false);
      ModalStore.closeModal();
      messageStore.setMessage({
        type: "success",
        text: "added file succesfully",
      });
    } catch (error: any) {
      console.log(error);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };

  const handleFilter = (query: string) => {
    if (query === "") {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(
        entries.filter((entry) =>
          entry.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleDelete = async (docId: string) => {
    try {
      await deleteCodeItemApi(userStore.user.uid, docId);
      const newEntries = entries.filter((entry) => entry.id !== docId);
      setEntries(newEntries);
      setFilteredEntries(newEntries);
      messageStore.setMessage({
        type: "success",
        text: "deleted file succesfully",
      });
    } catch (error: any) {
      console.log(error);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };
  const handleUpdate = async (docId: string, info: any) => {
    try {
      await updateCodeItemApi(userStore.user.uid, docId, info);
      const newCodeItem = { id: docId, ...info };
      const newEntries = entries.map((entry) =>
        entry.id == docId ? newCodeItem : entry
      );
      setEntries(newEntries);
      setFilteredEntries(newEntries);
      messageStore.setMessage({
        type: "success",
        text: "updated file succesfully",
      });
    } catch (error: any) {
      console.log(error);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Your Code Snippets
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => ModalStore.openModal(modals.addCodeItem)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Code Item
          </button>
        </div>
        <Filter onFilter={handleFilter} />
        <CodeListItems
          onUpdate={handleUpdate}
          entries={filteredEntries}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
        <Modal isOpen={ModalStore.modalName === modals.addCodeItem}>
          <Form
            onSubmit={handleFormSubmit}
            onClose={() => ModalStore.closeModal()}
          />
        </Modal>

        {/*  the full list */}
        {/* <div className="mt-8">
        {entries.map((entry, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold">{entry.title}</h2>
            <p className="text-gray-700">{entry.description}</p>
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">
              <code>{entry.code}</code>
            </pre>
          </div>
        ))}
      </div> */}
      </div>
    </ProtectedRoute>
  );
};

export default observer(Home);
