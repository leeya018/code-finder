import { db } from "@/firebase";
import { User } from "@/interfaces/User";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const findUserApi = async (userId: string) => {
  // Reference to the user's document in Firestore
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  // If user does not exist in Firestore, add them
  if (!userSnap.exists()) throw new Error("user is not exists");

  // Fetch and return the user data
  const userData = await getDoc(userRef);
  return { id: userData.id, ...(userData.data() as User) };
};
