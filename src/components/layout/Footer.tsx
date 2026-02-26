'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`py-12 border-t ${
      isDark ? 'bg-black border-[#333336]' : 'bg-white border-[#D2D2D7]'
    }`}>
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <a
          href="mailto:keigo-minamida@g.ecc.u-tokyo.ac.jp"
          className={`inline-block text-xl font-semibold transition-colors ${
            isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'
          }`}
        >
          mkeigo1110@gmail.com
        </a>
      </motion.div>
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-[#86868B]">
          &copy; {new Date().getFullYear()} Keigo Minamida.
          <span className="ml-2">
            Created on the shoulders of history.
          </span>
        </p>
      </motion.div>
    </footer>
  );
}
