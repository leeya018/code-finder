"use client";

import React from "react";
import Header from "../components/Header";
import ProtectedRoute from "../components/protectedRoute";
import Image from "next/image";

const InstructionsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <Header />
      <div className="p-8 mt-10 max-w-2xl mx-auto font-sans">
        <h1 className="text-center text-3xl font-bold mb-6">
          Program Instructions
        </h1>
        <p className="text-lg mb-4">
          This program helps you save pieces of code that you use all the time,
          especially those that are long and tedious to type repeatedly.
          Sometimes, there are pieces of code that you don’t use frequently, and
          you might forget them. Instead of going online and searching for them
          for a long time, you can save them for future reference.
        </p>
        <p className="text-lg mb-4">
          With this program, you can save a lot of time by having your
          frequently used or easy-to-forget code snippets easily accessible.
          It’s a handy tool to keep your coding process efficient and organized.
        </p>
        <p className="text-lg mb-4 font-semibold">
          To edit a codeItem, simply double-click on it. The codeItem will open
          in a modal view where you can make your changes.
        </p>

        <div>
          <div>how to use</div>
          <div className="youtube-embed">
            <iframe
              width="700"
              height="455"
              src={`https://www.youtube.com/embed/nA-o12kyimM`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube Video"
            ></iframe>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default InstructionsPage;
