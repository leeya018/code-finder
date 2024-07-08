// deleteCodeItem.ts

import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteCodeItem = async (docId: string): Promise<any> => {
  try {
    const docRef = doc(db, "codeItems", docId);
    await deleteDoc(docRef);
    console.log(`Document with ID ${docId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
