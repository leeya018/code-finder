// components/CodeListItems.tsx
import { deleteCodeItemApi } from "@/firestore";
import { CodeItem } from "@/interfaces/CodeItem";
import { messageStore } from "@/stores/messageStore";
import { ModalStore } from "@/stores/modalStore";
import { modals } from "@/util";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Modal from "./Modal";
import CodeItemContent from "./CodeItemContent";

interface CodeListItemsProps {
  entries: CodeItem[];
  onDelete: (title: string) => void;
  isLoading: boolean;
}

const CodeListItems: React.FC<CodeListItemsProps> = ({
  entries,
  onDelete,
  isLoading,
}) => {
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

      ModalStore.closeModal();
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && entries.length === 0 && <div>List is Empty</div>}
      <ul className="list-disc pl-5">
        {entries.map((entry, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedCodeItem(entry);
              ModalStore.openModal(modals.codeItemView);
            }}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {entry.title}
          </li>
        ))}
      </ul>

      <Modal
        isOpen={
          selectedCodeItem !== null &&
          ModalStore.modalName === modals.codeItemView
        }
      >
        <CodeItemContent
          selectedCodeItem={selectedCodeItem}
          onClose={() => {
            setSelectedCodeItem(null);
            ModalStore.closeModal();
          }}
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  );
};

export default observer(CodeListItems);
