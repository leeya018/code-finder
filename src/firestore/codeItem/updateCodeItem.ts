import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const updateCodeItemApi = async (
  userId: string,
  docId: string,
  info: any
): Promise<void> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);
  const houseRef = doc(db, "codeItems", docId);
  await updateDoc(houseRef, {
    ...info,
  });
  console.log(`docId ${docId} updated successfully.`);
};
