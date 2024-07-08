import { db } from "@/firebase";
import { User } from "@/interfaces/User";
import { doc, setDoc } from "firebase/firestore";

export const addUser = async (user: User) => {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
  }
};
