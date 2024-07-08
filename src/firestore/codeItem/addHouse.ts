import { db } from "@/firebase";
import { House } from "@/interfaces/House";
import { User } from "@/interfaces/User";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

export const addHouse = async (user: User, house: House) => {
  try {
    // if (user.role !== "admin") {
    //   throw new Error("insuffisent permission for adding new house ");
    // }
    const docRef: DocumentReference = await addDoc(collection(db, "houses"), {
      ...house,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { ...house, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
