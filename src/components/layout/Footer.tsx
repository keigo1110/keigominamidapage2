'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

export function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t py-12 ${
      isDark ? 'border-[#2A2724] bg-[#0C0B0A]' : 'border-[#E4DFD6] bg-[#F7F4EF]'
    }`}>
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <a
          href="mailto:keigo-minamida@g.ecc.u-tokyo.ac.jp"
          className={`inline-block text-xl font-semibold transition-colors ${
            isDark ? 'text-[#D4C07A] hover:text-[#B8A04A]' : 'text-[#8A7428] hover:text-[#6F5C1F]'
          }`}
        >
          mkeigo1110@gmail.com
        </a>
      </motion.div>
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p className={isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}>
          &copy; {new Date().getFullYear()} Keigo Minamida.
          <span className="ml-2">
            Created on the shoulders of history.
          </span>
        </p>
      </motion.div>
    </footer>
  );
}
