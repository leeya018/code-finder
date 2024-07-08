import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";

export const deleteAllCodeItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "codeItems"));
    const batch = writeBatch(db);
    querySnapshot.forEach((document) => {
      batch.delete(doc(db, "codeItems", document.id));
    });
    await batch.commit();
  } catch (error) {
    throw error;
  }
};
