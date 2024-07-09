// components/CodeItemContent.tsx
import { useState } from "react";

interface Entry {
  title: string;
  description: string;
  code: string;
}

interface CodeItemContentProps {
  selectedCodeItem: Entry | null;
  onClose: () => void;
  onDelete: () => void;
}

const CodeItemContent: React.FC<CodeItemContentProps> = ({
  selectedCodeItem,
  onClose,
  onDelete,
}) => {
  const [deleteTitle, setDeleteTitle] = useState("");
  const [copyTxtBtn, setCopyTxtBtn] = useState("copy");

  const handleDelete = () => {
    if (selectedCodeItem && deleteTitle === selectedCodeItem.title) {
      onDelete();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{selectedCodeItem?.title}</h2>
      <p className="mb-4">{selectedCodeItem?.description}</p>
      <pre className="bg-gray-100 p-2 rounded overflow-auto mb-4 relative overflow-y-auto max-h-96">
        <button
          className={`absolute right-2 top-2 ${
            copyTxtBtn === "Copied" && "bg-black text-white  px-2 rounded-md"
          }`}
          onClick={() => {
            if (!selectedCodeItem?.code) return;
            navigator.clipboard.writeText(selectedCodeItem.code);
            setCopyTxtBtn("Copied");
          }}
        >
          {copyTxtBtn}
        </button>
        <code>{selectedCodeItem?.code}</code>
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
          onClick={onClose}
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
  );
};

export default CodeItemContent;
