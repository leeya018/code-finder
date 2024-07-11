import { Timestamp } from "firebase/firestore";

export type CodeItem = {
  id?: string;
  title: string;
  description: string;
  code: string;
  userId: string;
  createdAt?: Timestamp;
};
