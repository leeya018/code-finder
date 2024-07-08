import { db } from "@/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const updateHouse = async (
  houseId: string,
  info: any
): Promise<void> => {
  try {
    const houseRef = doc(db, "houses", houseId);
    await updateDoc(houseRef, {
      ...info,
    });
    console.log(`House ${houseId} updated successfully.`);
  } catch (error: any) {
    console.error("Error updating house: ", error);
    throw new Error("Failed to update house");
  }
};
