import React from 'react';
import { useTheme } from '../../context/themeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <FaSun className="text-yellow-400" size={20} />
      ) : (
        <FaMoon className="text-gray-700" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
