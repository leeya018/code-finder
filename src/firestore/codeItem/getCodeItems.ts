import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const getCodeItemsApi = async (userId: string): Promise<CodeItem[]> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(
    collection(db, "codeItems"),
    where("userId", "==", userId),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(q);
  const codeItems = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CodeItem[];
  return codeItems;
};
