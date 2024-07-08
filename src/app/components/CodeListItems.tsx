// components/CodeListItems.tsx
import { deleteCodeItemApi } from "@/firestore";
import { CodeItem } from "@/interfaces/CodeItem";
import { messageStore } from "@/stores/messageStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface CodeListItemsProps {
  entries: CodeItem[];
  onDelete: (title: string) => void;
}

const CodeListItems: React.FC<CodeListItemsProps> = ({ entries, onDelete }) => {
  const [selectedCodeItem, setSelectedCodeItem] = useState<CodeItem | null>(
    null
  );
  const [deleteTitle, setDeleteTitle] = useState("");

  const handleDelete = () => {
    if (selectedCodeItem && deleteTitle === selectedCodeItem.title) {
      if (!selectedCodeItem?.id) throw new Error("selectedCodeItem has not Id");
      onDelete(selectedCodeItem?.id);
      setSelectedCodeItem(null);
      setDeleteTitle("");
    }
  };

  return (
    <div>
      <ul className="list-disc pl-5">
        {entries.map((entry, index) => (
          <li
            key={index}
            onClick={() => setSelectedCodeItem(entry)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {entry.title}
          </li>
        ))}
      </ul>

      {selectedCodeItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCodeItem.title}
            </h2>
            <p className="mb-4">{selectedCodeItem.description}</p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto mb-4">
              <code>{selectedCodeItem.code}</code>
            </pre>
            <div className="mb-4">
              <input
                type="text"
                value={deleteTitle}
                onChange={(e) => setDeleteTitle(e.target.value)}
                placeholder="Type title to delete"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedCodeItem(null)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(CodeListItems);
