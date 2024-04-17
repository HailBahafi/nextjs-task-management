"use client";
import React from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        />
        <div className="w-[49px] h-[25px] bg-indigo-50 border border-gray-400 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-gray-400 dark:peer-focus:ring-gray-400 rounded-full peer dark:bg-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-gray-100 after:content-[''] after:absolute after:top-0.5 after:left-[4px] dark:after:bg-white after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border dark:border-gray-400 peer-checked:bg-indigo-600"></div>
        <label className="hidden">x</label>
      </label>
    </div>
  );
};

export default ThemeToggle;