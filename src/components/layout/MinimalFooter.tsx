'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { minimalStyles } from '../../utils/minimal-styles'

export function MinimalFooter() {
  const { isDark } = useTheme();

  return (
    <footer id="contact" className={`${isDark ? 'bg-gray-950 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className={`${minimalStyles.container.section} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className={`${minimalStyles.heading.h3(isDark)} mb-4`}>
            Get in Touch
          </h2>
          
          <a
            href="mailto:mkeigo1110@gmail.com"
            className={`${minimalStyles.button.primary(isDark)} inline-block`}
          >
            Send Email
          </a>
          
          <div className={`${minimalStyles.text.muted(isDark)} pt-8`}>
            <p>&copy; {new Date().getFullYear()} Keigo Minamida. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}