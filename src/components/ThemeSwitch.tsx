'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
// ダークモード固定

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'light' as const, icon: FaSun, label: 'Light', color: 'text-yellow-400' },
    { key: 'dark' as const, icon: FaMoon, label: 'Dark', color: 'text-purple-400' },
    { key: 'system' as const, icon: FaDesktop, label: 'System', color: 'text-cyan-400' },
  ];

  const currentThemeIndex = Math.max(0, themes.findIndex(t => t.key === theme));

  const handleThemeChange = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    if (nextTheme) {
      setTheme(nextTheme.key);
    }
  };

  const currentTheme = themes[currentThemeIndex]!;
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length]!;

  return (
    <motion.button
      onClick={handleThemeChange}
      className="relative p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 dark:bg-slate-200/10 dark:hover:bg-slate-200/20 backdrop-blur-sm border border-purple-500/20 dark:border-cyan-400/20 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      title={`Switch to ${nextTheme.label} theme`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className={`${currentTheme.color} text-xl`}
          >
            <currentTheme.icon />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0, y: 0 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {currentTheme.label} Mode
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r ${
          theme === 'light'
            ? 'from-yellow-400/20 to-orange-400/20'
            : theme === 'dark'
            ? 'from-purple-400/20 to-blue-400/20'
            : 'from-cyan-400/20 to-emerald-400/20'
        }`}
        animate={{
          boxShadow: [
            `0 0 20px ${theme === 'light' ? '#facc15' : theme === 'dark' ? '#a855f7' : '#06b6d4'}20`,
            `0 0 30px ${theme === 'light' ? '#facc15' : theme === 'dark' ? '#a855f7' : '#06b6d4'}30`,
            `0 0 20px ${theme === 'light' ? '#facc15' : theme === 'dark' ? '#a855f7' : '#06b6d4'}20`,
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
}