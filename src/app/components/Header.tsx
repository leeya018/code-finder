import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { observer } from "mobx-react-lite";

import { getAuth, signOut } from "firebase/auth";

import { toJS } from "mobx";
import userStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
// components/Header.js

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleImageClick = () => {
    setShowLogout(!showLogout);
  };
  const auth = getAuth();

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
      <nav className="mx-10 flex items-center justify-between">
        <ul className="flex justify-between items-center gap-4">
          <li className="cursor-pointer">
            <Link href="/">
              <span className="font-bold">Code Finder</span>
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
        <div className="relative flex items-center">
          <Image
            className="rounded-full cursor-pointer"
            src={userStore.user?.photoURL || "/default-profile.png"}
            width={35}
            height={35}
            alt="Profile image"
            onClick={handleImageClick}
          />
          {showLogout && (
            <div
              className="absolute top-12 left-0 bg-black shadow-md rounded p-2 cursor-pointer"
              onClick={logoutUser}
            >
              Logout
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default observer(Header);
