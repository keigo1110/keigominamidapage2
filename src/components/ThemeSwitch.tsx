'use client'

import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeSwitch() {
  const { isDark, setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark' || (theme === 'system' && isDark)) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-full transition-all duration-300 ${
        isDark
          ? 'bg-[#1D1D1F] hover:bg-[#333336] text-[#F5F5F7]'
          : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F]'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90, scale: 0 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
        </motion.div>
      </div>
    </motion.button>
  );
}
