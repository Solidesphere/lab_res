"use client";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full flex justify-center items-center py-8 px-4">
      <div className="max-w-3xl w-full rounded-2xl bg-white/30 backdrop-blur-md shadow-xl ring-1 ring-black/10 p-6 transition-all duration-500 ease-in-out animate-fade-in text-center">
        <p className="text-sm sm:text-base text-gray-800 dark:text-white font-medium">
          &copy; {year} LABORATOIRE D'ANALYSES MÉDICALES EL-THIKA. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
