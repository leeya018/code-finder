import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export const isUserInSystemApi = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists();
};
