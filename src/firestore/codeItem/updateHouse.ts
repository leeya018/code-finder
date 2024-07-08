import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updateDocItem = async (
  docId: string,
  info: any
): Promise<void> => {
  const houseRef = doc(db, "codeItems", docId);
  await updateDoc(houseRef, {
    ...info,
  });
  console.log(`docId ${docId} updated successfully.`);
};
