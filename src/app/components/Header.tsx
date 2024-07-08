import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { observer } from "mobx-react-lite";

import { getAuth, signOut } from "firebase/auth";

import { toJS } from "mobx";
import userStore from "@/stores/userStore";
// components/Header.js

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const auth = getAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  console.log({ userAuth: toJS(userStore.user) });

  return (
    <header
      className="bg-blue-500 border-white text-white
        fixed top-0 left-0 py-2 
    right-0 z-0 border-b-2"
    >
      <nav className="mx-10">
        <ul className="flex justify-between items-center">
          <li>Code Finder</li>
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src={userStore.user?.photoURL}
              width={35}
              height={35}
              alt="Profile image"
            />
            <div className="cursor-pointer" onClick={logoutUser}>
              logout
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default observer(Header);
