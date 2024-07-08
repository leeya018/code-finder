import { db } from "@/firebase";
import { House } from "@/interfaces/House";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getHouseById = async (houseId: string): Promise<House | null> => {
  const houseRef = doc(db, "houses", houseId);
  const houseDoc = await getDoc(houseRef);
  if (houseDoc.exists()) {
    return { id: houseDoc.id, ...houseDoc.data() } as House;
  } else {
    console.log(`No such house with ID: ${houseId}`);
    return null;
  }
};
