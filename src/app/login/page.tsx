"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";

import Image from "next/image";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { getUserApi } from "@/firestore";
import userStore from "@/stores/userStore";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = await getUserApi(user);
      userStore.setUser(userData);

      console.log({ userData });
      router.push("/");
    } catch (error) {
      console.error("Error logging in with Google: ", error);
      throw error;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex  border-2 mt-10 rounded-xl w-[90%] h-[90%]">
        {/* part left */}
        <div className="flex flex-1 flex-col items-center justify-center   ">
          <h1 className="text-3xl font-semibold "> Code Finder</h1>
          <div className="mt-6 ">
            Save the codes to your system to save time
          </div>
          <button
            onClick={googleSignIn}
            className="  mt-10
                  border-2 border-black rounded-xl
                 p-3 text-white
                font-semibold flex justify-center items-center gap-2   
                hover:bg-slate-100"
          >
            <Image
              alt="google image"
              width={32}
              height={32}
              className="rounded-lg "
              src={"/images/google.png"}
            />
            <div className=" text-black">Sign in with Google</div>
          </button>
        </div>
        {/* part second */}
        <div className="flex-1 relative w-full h-full">
          <Image
            layout="fill"
            className=" object-cover bg-center"
            alt="house "
            src={"/images/login.png"}
          />
        </div>
      </div>
    </div>
  );
};
export default observer(SettingsPage);
