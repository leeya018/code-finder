import { db } from "@/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const isUserExist = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists();
};
