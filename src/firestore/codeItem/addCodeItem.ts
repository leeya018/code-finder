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
import { findUserApi } from "../user/findUser";

export const addCodeItemApi = async (userId: string, codeItem: CodeItem) => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(
    collection(db, "codeItems"),
    where("title", "==", codeItem.title),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    throw new Error("this title is allraedy exists ");
  }
  const docRef: DocumentReference = await addDoc(collection(db, "codeItems"), {
    ...codeItem,
    createdAt: new Date(),
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
