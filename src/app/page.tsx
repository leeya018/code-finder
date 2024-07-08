// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { CodeItem } from "@/interfaces/CodeItem";
import { addCodeItemApi } from "@/firestore";
import { getCodeItems } from "@/firestore/codeItem/getCodeItems";
import CodeListItems from "./components/CodeListItems";
import Filter from "./components/Filter";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<CodeItem[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState<CodeItem[]>(entries);

  useEffect(() => {
    getCodeItems()
      .then((codeItems) => {
        setEntries(codeItems);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);
  const handleFormSubmit = (data: CodeItem) => {
    setEntries([...entries, data]);
    addCodeItemApi(data);
    setIsFormModalOpen(false);
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

  return (
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
      <CodeListItems entries={filteredEntries} />
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
  );
};

export default Home;
