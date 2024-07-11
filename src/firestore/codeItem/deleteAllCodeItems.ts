import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const deleteAllCodeItemsApi = async (userId: string) => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(collection(db, "codeItems"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const batch = writeBatch(db);
  querySnapshot.forEach((document) => {
    batch.delete(doc(db, "codeItems", document.id));
  });
  await batch.commit();
};
