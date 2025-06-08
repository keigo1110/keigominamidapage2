'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-lg py-12 border-t border-blue-500/20">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <a
          href="mailto:keigo-minamida@g.ecc.u-tokyo.ac.jp"
          className="text-blue-400 hover:text-blue-300 transition-colors inline-block text-xl font-semibold"
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
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Keigo Minamida.
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent ml-2">
            Created on the shoulders of history.
          </span>
        </p>
      </motion.div>
    </footer>
  );
}