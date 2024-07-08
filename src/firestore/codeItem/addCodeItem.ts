import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

export const addCodeItem = async (codeItem: CodeItem) => {
  try {
    // if (user.role !== "admin") {
    //   throw new Error("insuffisent permission for adding new house ");
    // }
    const docRef: DocumentReference = await addDoc(
      collection(db, "codeItems"),
      {
        ...codeItem,
        createdAt: new Date(),
      }
    );
    console.log("Document written with ID: ", docRef.id);
    return { ...codeItem, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
