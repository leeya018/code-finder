// components/Form.tsx
import { CodeItem } from "@/interfaces/CodeItem";
import userStore from "@/stores/userStore";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";

interface FormProps {
  onSubmit: (codeItem: CodeItem) => void;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = userStore.user.uid;
    const newCodeItem: CodeItem = {
      title,
      description,
      code,
      userId,
      createdAt: Timestamp.now(),
    };
    onSubmit(newCodeItem);
    setTitle("");
    setDescription("");
    setCode("");
    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="code"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Code
        </label>
        <textarea
          id="code"
          value={code}
          rows={20}
          onChange={(e) => setCode(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
