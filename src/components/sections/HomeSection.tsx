'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF, FaGithub, FaPencilAlt } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { SocialLink } from '../../types'
import {
  GlassmorphismHome,
  BrutalistHome,
  MinimalistHome,
  CyberpunkHome,
  MagazineHome,
  RetroSynthwaveHome,
  LuxuryPremiumHome,
  OrganicBiomorphicHome
} from './HomeSectionVariants'

const socialLinks: SocialLink[] = [
  { icon: FaTwitter, url: "https://twitter.com/mKeigo1110", style: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25" },
  { icon: FaInstagram, url: "https://www.instagram.com/namida1110/", style: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/keigominamida/", style: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25" },
  { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=100053066043602", style: "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-700/25" },
  { icon: FaGithub, url: "https://github.com/keigo1110", style: "dynamic" }, // Style will be set dynamically
  { icon: FaPencilAlt, url: "https://qiita.com/keigo1110", style: "bg-green-500 hover:bg-green-600 text-white shadow-green-500/25" }
];

// Array of all design variants
const HOME_VARIANTS = [
  GlassmorphismHome,
  BrutalistHome,
  MinimalistHome,
  CyberpunkHome,
  MagazineHome,
  RetroSynthwaveHome,
  LuxuryPremiumHome,
  OrganicBiomorphicHome,
  DefaultHome // We'll keep the original as one of the options
];

// Original Home Section as Default
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
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="md:w-1/3 mb-8 md:mb-0 relative"
        >
          <div className="relative">
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-400 to-blue-500'} rounded-full blur-2xl opacity-30`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Image
              src="/images/myface.jpg"
              alt="Keigo Minamida"
              width={300}
              height={300}
              className={`rounded-full shadow-2xl relative z-10 border-4 ${isDark ? 'border-blue-400/30' : 'border-blue-300/50'}`}
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:w-2/3 md:pl-12"
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${isDark ? 'from-blue-400 via-blue-500 to-blue-600' : 'from-blue-600 via-blue-700 to-blue-800'} bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t('name')}
          </motion.h1>

          <motion.p
            className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t('roll')}
          </motion.p>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <a
              href="https://www.iii.u-tokyo.ac.jp/"
              className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors block mb-2 text-lg font-medium`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('school')}
            </a>
            <a
              href="https://lab.rekimoto.org/"
              className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors block text-lg font-medium`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Lab')}
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {socialLinks.map((social, index) => {
              const style = social.style === 'dynamic'
                ? `${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white shadow-gray-800/25' : 'bg-gray-900 hover:bg-gray-800 text-white shadow-gray-900/25'}`
                : social.style;

              return (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 ${style}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.url}`}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="space-y-6"
          >
            <div className={`${isDark ? 'bg-slate-800/40' : 'bg-white/40'} backdrop-blur-sm rounded-2xl p-6 border ${isDark ? 'border-blue-500/20' : 'border-blue-200/30'} shadow-lg`}>
              <div className="flex flex-wrap gap-2 mb-4">
                {statementTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? `${isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} shadow-lg`
                        : `${isDark ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-700' : 'bg-gray-200/50 text-gray-600 hover:bg-gray-300'}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
              >
                {statementTabs[activeTab]?.content || ''}
              </motion.p>
            </div>

            <div className={`${isDark ? 'bg-slate-800/40' : 'bg-white/40'} backdrop-blur-sm rounded-2xl p-6 border ${isDark ? 'border-blue-500/20' : 'border-blue-200/30'} shadow-lg`}>
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {t('interests')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} rounded-full flex-shrink-0`} />
                    <span className="text-sm">{interest}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-slate-800/40' : 'bg-white/40'} backdrop-blur-sm rounded-2xl p-6 border ${isDark ? 'border-blue-500/20' : 'border-blue-200/30'} shadow-lg`}>
              <h3 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {t('education')}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('department')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeSection() {
  const [variantIndex, setVariantIndex] = useState<number>(() => {
    // Use a default index for SSR compatibility
    return 0;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);

    // Check if there's a stored variant for this session
    const storedVariant = sessionStorage.getItem('homeSectionVariant');
    if (storedVariant === null) {
      // If no stored variant, select a random one
      const randomIndex = Math.floor(Math.random() * HOME_VARIANTS.length);
      setVariantIndex(randomIndex);
      sessionStorage.setItem('homeSectionVariant', randomIndex.toString());
    } else {
      // Use the stored variant
      const index = parseInt(storedVariant, 10);
      if (index >= 0 && index < HOME_VARIANTS.length) {
        setVariantIndex(index);
      }
    }
  }, []);

    // Get the current component based on variant index
  const SelectedVariant = isClient ? (HOME_VARIANTS[variantIndex] || DefaultHome) : DefaultHome;

  return (
    <motion.div
      key={`variant-${variantIndex}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SelectedVariant />
    </motion.div>
  );
}