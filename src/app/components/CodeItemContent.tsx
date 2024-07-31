import { CodeItem } from "@/interfaces/CodeItem";
import { messageStore } from "@/stores/messageStore";
import { ModalStore } from "@/stores/modalStore";
import { useState } from "react";

interface CodeItemContentProps {
  selectedCodeItem: CodeItem | null;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (docId: string, updatedItem: any) => void;
}

const CodeItemContent: React.FC<CodeItemContentProps> = ({
  selectedCodeItem,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [deleteTitle, setDeleteTitle] = useState("");
  const [copyTxtBtn, setCopyTxtBtn] = useState("copy");
  const [isEditing, setIsEditing] = useState({
    title: false,
    description: false,
    code: false,
  });
  const [editedItem, setEditedItem] = useState<CodeItem | null>(
    selectedCodeItem
  );

  const handleDelete = () => {
    if (selectedCodeItem) {
      onDelete();
    }
  };

  const handleFieldDoubleClick = (field: "title" | "description" | "code") => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleUpdate = () => {
    try {
      if (editedItem) {
        if (!editedItem?.id) throw new Error("editedItem has no id");
        onUpdate(editedItem?.id, editedItem);
        setIsEditing({ title: false, description: false, code: false });
        ModalStore.closeModal();
      }
    } catch (error: any) {
      console.log(error);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "description" | "code"
  ) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: e.target.value });
    }
  };

  return (
    <div>
      <div onDoubleClick={() => handleFieldDoubleClick("title")}>
        {isEditing.title ? (
          <input
            type="text"
            value={editedItem?.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
        ) : (
          <h2 className="text-2xl font-bold mb-4">{editedItem?.title}</h2>
        )}
      </div>

      <div onDoubleClick={() => handleFieldDoubleClick("description")}>
        {isEditing.description ? (
          <textarea
            value={editedItem?.description}
            onChange={(e) => handleInputChange(e, "description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
        ) : (
          <p className="mb-4">{editedItem?.description}</p>
        )}
      </div>

      <div onDoubleClick={() => handleFieldDoubleClick("code")}>
        {isEditing.code ? (
          <textarea
            value={editedItem?.code}
            onChange={(e) => handleInputChange(e, "code")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            style={{ height: "150px" }}
          />
        ) : (
          <pre className="bg-gray-100 p-2 rounded overflow-auto mb-4 relative overflow-y-auto max-h-96">
            <button
              className={`absolute right-2 top-2 ${
                copyTxtBtn === "Copied" &&
                "bg-black text-white  px-2 rounded-md"
              }`}
              onClick={() => {
                if (!selectedCodeItem?.code) return;
                navigator.clipboard.writeText(selectedCodeItem.code);
                setCopyTxtBtn("Copied");
              }}
            >
              {copyTxtBtn}
            </button>
            <code>{editedItem?.code}</code>
          </pre>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={deleteTitle}
          onChange={(e) => setDeleteTitle(e.target.value)}
          placeholder="Type title to delete"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
        >
          Close
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
        {isEditing.title || isEditing.description || isEditing.code ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CodeItemContent;
