// stores/messageStore.ts
import { makeAutoObservable } from "mobx";

export interface Message {
  type: "error" | "success" | "";
  text: string;
}

class MessageStore {
  message: Message | null = null;

  constructor() {
    makeAutoObservable(this);
    // this.message = {
    //   type: "success",
    //   text: "hello",
    // };
  }

  setMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.message = {
        type: "",
        text: "",
      };
    }, 3000);
  }

  clearMessage() {
    this.message = null;
  }
}

export const messageStore = new MessageStore();
