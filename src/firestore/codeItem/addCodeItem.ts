import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const addCodeItem = async (codeItem: CodeItem) => {
  try {
    const q = query(
      collection(db, "codeItems"),
      where("title", "==", codeItem.title)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("this title is allraedy exists ");
    }
    const docRef: DocumentReference = await addDoc(
      collection(db, "codeItems"),
      {
        ...codeItem,
        createdAt: new Date(),
      }
    );
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
    // return { ...codeItem, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
