// deleteCodeItem.ts

import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const deleteCodeItemApi = async (
  userId: string,
  docId: string
): Promise<any> => {
  try {
    if (!userId) throw new Error("id of user not defiend");
    await findUserApi(userId);
    const docRef = doc(db, "codeItems", docId);
    await deleteDoc(docRef);
    console.log(`Document with ID ${docId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
