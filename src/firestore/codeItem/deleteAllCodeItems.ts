import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const deleteAllCodeItemsApi = async (userId: string) => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);
  const querySnapshot = await getDocs(collection(db, "codeItems"));
  const batch = writeBatch(db);
  querySnapshot.forEach((document) => {
    batch.delete(doc(db, "codeItems", document.id));
  });
  await batch.commit();
};
