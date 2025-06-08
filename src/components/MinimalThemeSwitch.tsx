'use client'

import { motion } from 'framer-motion';
import { FaMoon } from 'react-icons/fa';

export function MinimalThemeSwitch() {
  // ダークモード固定

  return (
    <motion.button
      disabled
      className="p-2 rounded-lg text-gray-400 cursor-not-allowed opacity-50"
      aria-label="Dark theme (fixed)"
    >
      <motion.div>
        <FaMoon className="text-lg" />
      </motion.div>
    </motion.button>
  );
}