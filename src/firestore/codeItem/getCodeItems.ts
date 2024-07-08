import { db } from "@/firebase";
import { CodeItem } from "@/interfaces/CodeItem";

import { collection, getDocs } from "firebase/firestore";

export const getCodeItems = async (): Promise<CodeItem[]> => {
  try {
    const housesCollection = collection(db, "codeItems");
    const houseSnapshot = await getDocs(housesCollection);
    const todeItems = houseSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CodeItem[];
    return todeItems;
  } catch (error: any) {
    console.error("Error fetching codeItems: ", error);
    throw error;
  }
};
