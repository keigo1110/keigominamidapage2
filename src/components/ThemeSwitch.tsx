'use client'

import { motion } from 'framer-motion';
import { FaMoon } from 'react-icons/fa';

export function ThemeSwitch() {
  // ダークモード固定

  return (
    <motion.button
      disabled
      className="relative p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 cursor-not-allowed opacity-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      title="Dark theme (fixed)"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <motion.div
          className="text-purple-400 text-xl"
        >
          <FaMoon />
        </motion.div>
      </div>
    </motion.button>
  );
}