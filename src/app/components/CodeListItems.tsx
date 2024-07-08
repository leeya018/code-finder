// components/CodeListItems.tsx
import { CodeItem } from "@/interfaces/CodeItem";
import { useState } from "react";

interface CodeListItemsProps {
  entries: CodeItem[];
}

const CodeListItems: React.FC<CodeListItemsProps> = ({ entries }) => {
  const [selectedEntry, setSelectedEntry] = useState<CodeItem | null>(null);

  return (
    <div>
      <ul className="list-disc pl-5">
        {entries.map((entry, index) => (
          <li
            key={index}
            onClick={() => setSelectedEntry(entry)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {entry.title}
          </li>
        ))}
      </ul>

      {selectedEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{selectedEntry.title}</h2>
            <p className="mb-4">{selectedEntry.description}</p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto mb-4">
              <code>{selectedEntry.code}</code>
            </pre>
            <button
              onClick={() => setSelectedEntry(null)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeListItems;
