'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF, FaGithub, FaPencilAlt } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { SocialLink } from '../../types'

const socialLinks: SocialLink[] = [
  { icon: FaTwitter, url: "https://twitter.com/keigominamida", style: "default" },
  { icon: FaInstagram, url: "https://www.instagram.com/namida1110/", style: "default" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/keigominamida/", style: "default" },
  { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=100053066043602", style: "default" },
  { icon: FaGithub, url: "https://github.com/keigo1110", style: "default" },
  { icon: FaPencilAlt, url: "https://qiita.com/keigo1110", style: "default" }
];

function DefaultHome() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];

  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    { id: 1, label: t('statementTab2'), content: t('statement2') },
    { id: 2, label: t('statementTab3'), content: t('statement3') }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative safe-area-top safe-area-bottom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full lg:w-1/3 mb-8 lg:mb-0 relative flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <div className="relative w-full h-full">
              <Image
                src="/images/myface.jpg"
                alt={t('profileAlt')}
                fill
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                className="rounded-full shadow-lg object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full lg:w-2/3 lg:pl-8 xl:pl-12 text-center lg:text-left"
        >
          <motion.h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 sm:mb-6 leading-tight ${
              isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t('name')}
          </motion.h1>

          <motion.p
            className={`text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed ${
              isDark ? 'text-[#86868B]' : 'text-[#86868B]'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t('roll')}
          </motion.p>

          <motion.div
            className="mb-6 sm:mb-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="https://www.iii.u-tokyo.ac.jp/"
              className={`transition-colors block text-base sm:text-lg font-medium focus:outline-none focus:ring-4 rounded-lg px-2 py-1 inline-block ${
                isDark ? 'text-[#F5F5F7] hover:text-[#2997FF] focus:ring-[#2997FF]/50' : 'text-[#1D1D1F] hover:text-[#0071E3] focus:ring-[#0071E3]/50'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('school')}
            </a>
            <a
              href="https://lab.rekimoto.org/"
              className={`transition-colors block text-base sm:text-lg font-medium focus:outline-none focus:ring-4 rounded-lg px-2 py-1 inline-block ${
                isDark ? 'text-[#F5F5F7] hover:text-[#2997FF] focus:ring-[#2997FF]/50' : 'text-[#1D1D1F] hover:text-[#0071E3] focus:ring-[#0071E3]/50'
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Lab')}
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className={`p-3 sm:p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 ${
                  isDark
                    ? 'bg-[#1D1D1F] hover:bg-[#333336] text-[#86868B] hover:text-[#F5F5F7] focus:ring-[#2997FF]/50'
                    : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F] focus:ring-[#0071E3]/50'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.url.split('/').pop() || social.url} profile`}
              >
                <social.icon className="text-lg sm:text-xl" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="space-y-6"
          >
            <div className={`rounded-2xl p-4 sm:p-6 ${
              isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
            }`}>
              <div className="flex flex-wrap gap-2 mb-4">
                {statementTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base focus:outline-none focus:ring-4 ${
                      isDark ? 'focus:ring-[#2997FF]/50' : 'focus:ring-[#0071E3]/50'
                    } ${
                      activeTab === tab.id
                        ? isDark
                          ? 'bg-[#2997FF] text-white shadow-lg'
                          : 'bg-[#0071E3] text-white shadow-lg'
                        : isDark
                          ? 'bg-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7]'
                          : 'bg-[#E8E8ED] text-[#86868B] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-sm sm:text-base lg:text-lg leading-relaxed max-h-96 overflow-y-auto ${
                  isDark ? 'text-[#86868B]' : 'text-[#86868B]'
                }`}
              >
                {statementTabs[activeTab]?.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Research Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className={`rounded-2xl p-4 sm:p-6 ${
                isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
              }`}
            >
              <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${
                isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
              }`}>
                {t('interests')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isDark ? 'bg-[#2C2C2E] hover:bg-[#333336]' : 'bg-[#E8E8ED] hover:bg-[#D2D2D7]'
                    }`}
                  >
                    <span className={`text-sm sm:text-base ${
                      isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                    }`}>
                      {interest}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeSection() {
  return <DefaultHome />;
}
