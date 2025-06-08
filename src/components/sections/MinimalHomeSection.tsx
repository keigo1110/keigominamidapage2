'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { minimalStyles } from '../../utils/minimal-styles'

const socialLinks = [
  { icon: FaTwitter, url: "https://twitter.com/mKeigo1110", label: "Twitter" },
  { icon: FaGithub, url: "https://github.com/keigo1110", label: "GitHub" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/keigominamida/", label: "LinkedIn" },
];

export function MinimalHomeSection() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定

  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className={minimalStyles.container.section}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h1 className={`${minimalStyles.heading.h1(isDark)} mb-6`}>
              {t('name')}
            </h1>
            
            <p className={`${minimalStyles.text.body(isDark)} text-lg mb-8 leading-relaxed`}>
              {t('roll')}
            </p>
            
            <div className="space-y-2 mb-8">
              <a 
                href="https://www.iii.u-tokyo.ac.jp/"
                className={minimalStyles.link.default(isDark)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('school')}
              </a>
              <br />
              <a 
                href="https://lab.rekimoto.org/"
                className={minimalStyles.link.default(isDark)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('Lab')}
              </a>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                  whileHover={{ y: -2 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <Image
                src="/images/myface.jpg"
                alt="Keigo Minamida"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto"
                priority
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}