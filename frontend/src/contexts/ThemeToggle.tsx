// src/components/ThemeToggle.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
        <RiMoonLine className="text-xl" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <RiMoonLine className="text-xl" /> : <RiSunLine className="text-xl" />}
    </button>
  );
}