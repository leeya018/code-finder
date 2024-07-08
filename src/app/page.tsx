// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { CodeItem } from "@/interfaces/CodeItem";
import {
  addCodeItemApi,
  deleteCodeItemApi,
  getCodeItemsApi,
} from "@/firestore";
import CodeListItems from "./components/CodeListItems";
import Filter from "./components/Filter";
import { messageStore } from "@/stores/messageStore";
import { observer } from "mobx-react-lite";
import ProtectedRoute from "./components/protectedRoute";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<CodeItem[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<CodeItem[]>([]);

  useEffect(() => {
    getCodeItemsApi()
      .then((codeItems) => {
        setEntries(codeItems);
        setFilteredEntries(codeItems);
        messageStore.setMessage({
          type: "success",
          text: "fetch file succesfully",
        });
      })
      .catch((e: any) => {
        console.log(e);
        messageStore.setMessage({ type: "error", text: e.message });
      });
  }, []);
  const handleFormSubmit = async (data: CodeItem) => {
    try {
      const docId = await addCodeItemApi(data);
      console.log({ id: docId, ...data });
      console.log(entries);
      setFilteredEntries([...entries, { id: docId, ...data }]);
      setIsFormModalOpen(false);
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
      await deleteCodeItemApi(docId);
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

  return (
    <ProtectedRoute>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Your Code Snippets
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Code Item
          </button>
        </div>
        <Filter onFilter={handleFilter} />
        <CodeListItems entries={filteredEntries} onDelete={handleDelete} />
        {/* <Form onSubmit={handleFormSubmit} /> */}
        {isFormModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
              <Form
                onSubmit={handleFormSubmit}
                onClose={() => setIsFormModalOpen(false)}
              />
            </div>
          </div>
        )}
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
