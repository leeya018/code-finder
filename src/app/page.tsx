// pages/index.tsx
"use client";
import { useState } from "react";
import Form from "./components/Form";

interface Entry {
  title: string;
  description: string;
  code: string;
}

const Home: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleFormSubmit = (data: Entry) => {
    setEntries([...entries, data]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Add Your Code Snippets
      </h1>
      <Form onSubmit={handleFormSubmit} />
      <div className="mt-8">
        {entries.map((entry, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold">{entry.title}</h2>
            <p className="text-gray-700">{entry.description}</p>
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-auto">
              <code>{entry.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
