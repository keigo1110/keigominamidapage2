'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebookF, FaGithub, FaPencilAlt } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { SocialLink } from '../../types'

const socialLinks: SocialLink[] = [
  { icon: FaTwitter, url: "https://twitter.com/keigominamida", style: "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25" },
  { icon: FaInstagram, url: "https://www.instagram.com/namida1110/", style: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-500/25" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/keigominamida/", style: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25" },
  { icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=100053066043602", style: "bg-blue-700 hover:bg-blue-800 text-white shadow-blue-700/25" },
  { icon: FaGithub, url: "https://github.com/keigo1110", style: "dynamic" },
  { icon: FaPencilAlt, url: "https://qiita.com/keigo1110", style: "bg-green-500 hover:bg-green-600 text-white shadow-green-500/25" }
];

// Design Pattern 1: Glassmorphism with floating cards
export function GlassmorphismHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'}, transparent 50%)`
        }}
      />

      {/* Floating glass cards */}
            <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 ${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-xl rounded-3xl`}
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              rotate: Math.random() * 360
            }}
            animate={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`${isDark ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-2xl rounded-3xl p-8 md:p-12 border ${isDark ? 'border-white/10' : 'border-black/10'} shadow-2xl`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="relative"
            >
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500 to-purple-600' : 'from-blue-400 to-purple-500'} rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                <Image
                  src="/images/myface.jpg"
                  alt="Keigo Minamida"
                  width={400}
                  height={400}
                  className={`rounded-3xl shadow-2xl relative z-10 ${isDark ? 'border-2 border-white/20' : 'border-2 border-black/10'}`}
                  priority
                />
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 50%, transparent 70%)`,
                  }}
                  animate={{
                    backgroundPosition: ['200% 0%', '-200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
                  {t('name')}
                </h1>
                <p className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('roll')}
                </p>
              </motion.div>

              {/* Glass cards for info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-4"
              >
                <div className={`${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md rounded-2xl p-4 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <a href="https://www.iii.u-tokyo.ac.jp/" className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                    {t('school')}
                  </a>
                </div>
                <div className={`${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md rounded-2xl p-4 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <a href="https://lab.rekimoto.org/" className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                    {t('Lab')}
                  </a>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                      social.style === 'dynamic'
                        ? `${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} text-current`
                        : social.style
                    } hover:scale-110 hover:rotate-3`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Statement with tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <div className={`${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md rounded-3xl p-8 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex flex-wrap gap-2 mb-6">
                {statementTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md ${
                      activeTab === tab.id
                        ? `${isDark ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'} shadow-lg`
                        : `${isDark ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-black/10 text-gray-700 hover:bg-black/20'}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
                >
                  {statementTabs[activeTab]?.content || ''}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 grid md:grid-cols-2 gap-4"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className={`${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-md rounded-2xl p-4 border ${isDark ? 'border-white/10' : 'border-black/10'} cursor-pointer transition-all duration-300`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${isDark ? 'from-blue-400 to-purple-600' : 'from-blue-600 to-purple-700'}`} />
                  <span>{interest}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 2: Brutalist with bold typography
export function BrutalistHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [glitchText, setGlitchText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Brutalist background pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 35px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 70px)`
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Name with glitch effect */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <h1 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-black'} relative`}>
                <span className={glitchText ? 'glitch' : ''}>
                  {t('name')}
                </span>
                {glitchText && (
                  <>
                    <span className="absolute top-0 left-0 text-blue-500 opacity-70" style={{ clipPath: 'inset(40% 0 60% 0)' }}>
                      {t('name')}
                    </span>
                    <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ clipPath: 'inset(60% 0 40% 0)' }}>
                      {t('name')}
                    </span>
                  </>
                )}
              </h1>
              <div className={`h-8 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} mt-2`} />
            </motion.div>

            {/* Role and info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`border-4 ${isDark ? 'border-white bg-black' : 'border-black bg-white'} p-6`}
            >
              <p className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {t('roll')}
              </p>
              <div className="space-y-2">
                <a href="https://www.iii.u-tokyo.ac.jp/" className={`block text-xl font-mono ${isDark ? 'text-blue-400 hover:bg-blue-400 hover:text-black' : 'text-blue-600 hover:bg-blue-600 hover:text-white'} transition-colors p-2`} target="_blank" rel="noopener noreferrer">
                  → {t('school')}
                </a>
                <a href="https://lab.rekimoto.org/" className={`block text-xl font-mono ${isDark ? 'text-blue-400 hover:bg-blue-400 hover:text-black' : 'text-blue-600 hover:bg-blue-600 hover:text-white'} transition-colors p-2`} target="_blank" rel="noopener noreferrer">
                  → {t('Lab')}
                </a>
              </div>
            </motion.div>

            {/* Statement tabs - Brutalist style */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`border-4 ${isDark ? 'border-white' : 'border-black'}`}
            >
              <div className={`flex ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {statementTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 p-4 font-bold uppercase transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${isDark ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`
                        : `hover:${isDark ? 'bg-gray-800' : 'bg-gray-200'}`
                    } ${index < statementTabs.length - 1 ? `border-r-4 ${isDark ? 'border-black' : 'border-white'}` : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className={`p-6 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
                            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-mono leading-relaxed"
              >
                {statementTabs[activeTab]?.content || ''}
              </motion.p>
            </AnimatePresence>
              </div>
            </motion.div>

            {/* Interests - Brutalist blocks */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 0.95, rotate: -2 }}
                  className={`border-4 ${isDark ? 'border-white bg-blue-500' : 'border-black bg-blue-600'} p-4 text-white font-bold uppercase cursor-pointer transition-all duration-200`}
                >
                  <span className="text-3xl mr-2">{index + 1}.</span>
                  <span>{interest}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar with image and social */}
          <div className="space-y-8">
            {/* Profile image - Brutalist frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className={`absolute -inset-4 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
              <div className="relative">
                <Image
                  src="/images/myface.jpg"
                  alt="Keigo Minamida"
                  width={300}
                  height={300}
                  className="w-full border-8 border-black"
                  priority
                />
                <div className={`absolute inset-0 border-8 ${isDark ? 'border-white' : 'border-black'} pointer-events-none`} />
              </div>
            </motion.div>

            {/* Social links - Brutalist buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-3 py-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-all duration-200`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="text-lg" />
                  <span className="text-sm">{social.url.split('/').pop()}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 3: Minimalist with subtle animations
export function MinimalistHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredInterest, setHoveredInterest] = useState<number | null>(null);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="space-y-16">
          {/* Header with name and image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className={`text-5xl font-light mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('name')}
              </h1>
              <div className={`h-px w-32 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/myface.jpg"
                alt="Keigo Minamida"
                width={120}
                height={120}
                className="rounded-full"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Info section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div>
              <p className={`text-sm uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Position
              </p>
              <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('roll')}
              </p>
            </div>
            <div>
              <p className={`text-sm uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Institution
              </p>
              <a href="https://www.iii.u-tokyo.ac.jp/" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                {t('school')}
              </a>
            </div>
            <div>
              <p className={`text-sm uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Laboratory
              </p>
              <a href="https://lab.rekimoto.org/" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                {t('Lab')}
              </a>
            </div>
          </motion.div>

          {/* Statement section with minimal tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-8">
              <div className="flex space-x-8">
                {statementTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? `${isDark ? 'text-white border-b-2 border-white' : 'text-gray-900 border-b-2 border-gray-900'}`
                        : `${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {statementTabs[activeTab]?.content || ''}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Interests with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className={`text-sm uppercase tracking-wider mb-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Research Interests
            </h3>
            <div className="space-y-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredInterest(index)}
                  onMouseLeave={() => setHoveredInterest(null)}
                  className="relative"
                >
                  <div className={`flex items-center space-x-4 py-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      0{index + 1}
                    </span>
                    <span className="flex-1">{interest}</span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ scaleX: hoveredInterest === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-blue-400' : 'bg-blue-600'} origin-left`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social links - minimal style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                whileHover={{ y: -2 }}
                className={`${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="text-xl" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 4: Cyberpunk with neon accents
export function CyberpunkHome() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-black">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-blue-900/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Scanline effect */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
          style={{ top: `${scanlinePosition}%` }}
        />
      </div>

      {/* Neon glow effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Cyber header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                {t('name')}
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30 blur-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400" />
              <p className="text-cyan-400 font-mono uppercase tracking-wider">
                {t('roll')}
              </p>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-black border-2 border-cyan-500/50 rounded-lg p-1">
                  <Image
                    src="/images/myface.jpg"
                    alt="Keigo Minamida"
                    width={300}
                    height={300}
                    className="w-full rounded"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded" />
                </div>
              </div>

              {/* Cyber info panels */}
              <div className="mt-6 space-y-3">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-black/80 border border-cyan-500/50 rounded p-3 backdrop-blur"
                >
                  <p className="text-cyan-400 text-xs font-mono mb-1">INSTITUTION</p>
                  <a href="https://www.iii.u-tokyo.ac.jp/" className="text-white hover:text-cyan-400 transition-colors text-sm" target="_blank" rel="noopener noreferrer">
                    {t('school')}
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-black/80 border border-purple-500/50 rounded p-3 backdrop-blur"
                >
                  <p className="text-purple-400 text-xs font-mono mb-1">LABORATORY</p>
                  <a href="https://lab.rekimoto.org/" className="text-white hover:text-purple-400 transition-colors text-sm" target="_blank" rel="noopener noreferrer">
                    {t('Lab')}
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-2 space-y-8"
            >
              {/* Cyber tabs */}
              <div className="bg-black/80 border border-cyan-500/50 rounded-lg backdrop-blur overflow-hidden">
                <div className="flex border-b border-cyan-500/50">
                  {statementTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-3 px-4 font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-b-2 border-cyan-400'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="mr-2">{'>'}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-300 leading-relaxed font-mono text-sm">
                        {statementTabs[activeTab]?.content || ''}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Cyber interests grid */}
              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.8)' }}
                    className="bg-black/80 border border-purple-500/50 rounded-lg p-4 backdrop-blur transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-400 font-mono text-lg">
                        [{index + 1}]
                      </span>
                      <span className="text-gray-300 text-sm">{interest}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cyber social links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, borderColor: 'rgba(0, 255, 255, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black/80 border border-cyan-500/50 rounded p-3 backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="text-cyan-400 text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 5: Magazine-style editorial layout
export function MagazineHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Magazine header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b-4 border-double border-current pb-8 mb-12"
        >
          <div className="flex justify-between items-baseline">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Portfolio Edition
              </p>
              <h1 className={`text-7xl md:text-9xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('name').split(' ')[0]}
              </h1>
              <h1 className={`text-7xl md:text-9xl font-serif -mt-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('name').split(' ')[1]}
              </h1>
            </div>
            <div className="text-right">
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Vol. 2024</p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Issue 12</p>
            </div>
          </div>
        </motion.div>

        {/* Magazine layout grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Main article column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-8"
          >
            {/* Feature image */}
            <div className="mb-8">
              <div className="relative">
                <Image
                  src="/images/myface.jpg"
                  alt="Keigo Minamida"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t ${isDark ? 'from-black/80' : 'from-white/80'} to-transparent`}>
                  <p className={`text-3xl font-serif italic ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    &ldquo;{t('roll')}&rdquo;
                  </p>
                </div>
              </div>
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Photo: Portfolio Archives
              </p>
            </div>

            {/* Article content with drop cap */}
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  {statementTabs.map((tab, index) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-1 text-sm uppercase tracking-wider transition-all duration-300 ${
                        activeTab === tab.id
                          ? `${isDark ? 'bg-white text-black' : 'bg-black text-white'}`
                          : `${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'} ${index > 0 ? 'border-l border-current' : ''}`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'} first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1`}>
                      {statementTabs[activeTab]?.content || ''}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`border-l-4 ${isDark ? 'border-gray-600' : 'border-gray-400'} pl-6 my-12`}
            >
              <p className={`text-2xl font-serif italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                &ldquo;Pioneering new ways for humans to interact with the world&rdquo;
              </p>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-4 space-y-8"
          >
            {/* Info box */}
            <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Quick Facts
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className={`text-xs uppercase ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Institution</dt>
                  <dd>
                    <a href="https://www.iii.u-tokyo.ac.jp/" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                      {t('school')}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={`text-xs uppercase ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Laboratory</dt>
                  <dd>
                    <a href="https://lab.rekimoto.org/" className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                      {t('Lab')}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Research interests as a list */}
            <div>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Research Focus
              </h3>
              <ul className="space-y-2">
                {interests.map((interest, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    <span className={`text-2xl font-serif ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      {index + 1}.
                    </span>
                    <span className="text-sm">{interest}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social links as a column */}
            <div>
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Connect
              </h3>
              <div className="space-y-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-3 py-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-all duration-200`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="text-lg" />
                    <span className="text-sm">{social.url.split('/').pop()}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 6: Retro Synthwave - 80s retrowave aesthetic
export function RetroSynthwaveHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 1 ? 1.5 : 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Synthwave grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900">
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 20, 147, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'bottom center'
          }}
        />
        {/* VHS scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Neon sun */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            scale: [1, glowIntensity, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 blur-xl opacity-80"
        />
        <div className="absolute inset-0 w-40 h-40 rounded-full border-4 border-pink-400/50" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="lg:w-2/3 text-center lg:text-left"
          >
            {/* Retro title with neon effect */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
              <span
                className="bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400 bg-clip-text text-transparent"
                style={{
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  textShadow: '0 0 30px rgba(255, 20, 147, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)'
                }}
              >
                {t('name')}
              </span>
              {/* Chromatic aberration effect */}
              <span
                className="absolute top-0 left-0 text-cyan-400 opacity-50 -z-10"
                style={{ transform: 'translate(-2px, -2px)' }}
              >
                {t('name')}
              </span>
              <span
                className="absolute top-0 left-0 text-pink-400 opacity-50 -z-10"
                style={{ transform: 'translate(2px, 2px)' }}
              >
                {t('name')}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-cyan-300 mb-8 font-light tracking-wide"
              style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
            >
              {t('roll')}
            </motion.p>

            {/* Retro info panels */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="bg-black/70 border border-pink-500/50 rounded-lg p-4 backdrop-blur-sm"
                style={{ boxShadow: '0 0 30px rgba(255, 20, 147, 0.3)' }}
              >
                <p className="text-pink-400 text-sm font-mono mb-1">[INSTITUTION]</p>
                <a href="https://www.iii.u-tokyo.ac.jp/" className="text-cyan-300 hover:text-pink-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  {t('school')}
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: -1 }}
                className="bg-black/70 border border-cyan-500/50 rounded-lg p-4 backdrop-blur-sm"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)' }}
              >
                <p className="text-cyan-400 text-sm font-mono mb-1">[LABORATORY]</p>
                <a href="https://lab.rekimoto.org/" className="text-pink-300 hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  {t('Lab')}
                </a>
              </motion.div>
            </div>

            {/* Retro statement tabs */}
            <div className="bg-black/80 border-2 border-purple-500/50 rounded-lg overflow-hidden mb-8" style={{ boxShadow: '0 0 40px rgba(138, 43, 226, 0.4)' }}>
              <div className="flex bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                {statementTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500/30 to-cyan-500/30 text-cyan-300 border-b-2 border-cyan-400'
                        : 'text-pink-400 hover:text-cyan-300 hover:bg-white/5'
                    }`}
                    style={activeTab === tab.id ? { textShadow: '0 0 15px rgba(0, 255, 255, 0.8)' } : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-cyan-300 font-mono text-sm leading-relaxed"
                  >
                    {statementTabs[activeTab]?.content || ''}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Social links - retro style */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                                                        className="bg-black/70 border-2 border-orange-500/50 rounded-lg p-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <social.icon className="text-orange-400 text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Retro portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:w-1/3"
          >
            <div className="relative">
              {/* Multiple neon borders */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-pink-500 to-orange-500 rounded-full blur-lg opacity-60 animate-pulse" />
              <div className="absolute -inset-2 border-4 border-pink-400/50 rounded-full" />
              <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full" />
              <Image
                src="/images/myface.jpg"
                alt="Keigo Minamida"
                width={350}
                height={350}
                className="rounded-full relative z-10"
                priority
                style={{ filter: 'sepia(10%) saturate(120%) contrast(110%)' }}
              />
              {/* VHS distortion effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Retro interests grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: Math.random() * 6 - 3
              }}
              className={`${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm p-6 border border-green-500/20 shadow-lg text-center transition-all duration-300 hover:shadow-xl`}
              style={{
                borderRadius: `${20 + Math.random() * 10}px ${15 + Math.random() * 10}px ${20 + Math.random() * 10}px ${15 + Math.random() * 10}px`,
                background: `linear-gradient(135deg,
                  hsla(${120 + index * 45}, 70%, 60%, 0.1),
                  hsla(${200 + index * 60}, 70%, 70%, 0.05))`
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `conic-gradient(from ${index * 90}deg,
                    hsl(${120 + index * 45}, 70%, 60%),
                    hsl(${200 + index * 60}, 70%, 70%))`,
                  borderRadius: '50%'
                }}
              >
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </motion.div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{interest}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Design Pattern 7: Luxury Premium - Elegant and sophisticated
export function LuxuryPremiumHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Luxury marble background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(212, 175, 55, 0.1) 0%,
                transparent 50%),
              linear-gradient(135deg,
                rgba(212, 175, 55, 0.05) 0%,
                rgba(184, 134, 11, 0.05) 25%,
                rgba(146, 64, 14, 0.05) 50%,
                rgba(120, 53, 15, 0.05) 75%,
                rgba(212, 175, 55, 0.05) 100%)
            `
          }}
        />
        {/* Marble texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-60"
            animate={{
              y: [Math.random() * window.innerHeight, -100],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Luxury header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h1 className={`text-7xl md:text-9xl font-serif mb-6 ${isDark ? 'text-white' : 'text-gray-900'} relative`}>
                <span className="bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  {t('name')}
                </span>
                {/* Gold leaf effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 blur-xl" />
              </h1>

              {/* Ornamental lines */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-500" />
                <div className="w-3 h-3 border border-yellow-500 rotate-45" />
                <p className={`text-xl tracking-[0.3em] uppercase ${isDark ? 'text-gray-300' : 'text-gray-700'} font-light`}>
                  {t('roll')}
                </p>
                <div className="w-3 h-3 border border-yellow-500 rotate-45" />
                <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-500" />
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Elegant portrait */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative group">
                {/* Ornate frame */}
                <div className="absolute -inset-8 border-4 border-yellow-500/30 rounded-lg" />
                <div className="absolute -inset-4 border-2 border-yellow-400/50 rounded-lg" />
                <div className="absolute -inset-12">
                  <div className="w-full h-full border border-yellow-600/20 rounded-lg relative">
                    {/* Corner ornaments */}
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`absolute w-8 h-8 border-t-2 border-l-2 border-yellow-500/60 ${
                        i === 0 ? 'top-0 left-0' :
                        i === 1 ? 'top-0 right-0 rotate-90' :
                        i === 2 ? 'bottom-0 right-0 rotate-180' :
                        'bottom-0 left-0 -rotate-90'
                      }`} />
                    ))}
                  </div>
                </div>

                <Image
                  src="/images/myface.jpg"
                  alt="Keigo Minamida"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-700"
                  priority
                  style={{ filter: 'sepia(10%) saturate(120%) contrast(110%)' }}
                />

                {/* Elegant glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-yellow-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Luxury content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Elegant info cards */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20 shadow-lg`}
                >
                  <h3 className="text-sm uppercase tracking-wider text-yellow-600 mb-2 font-medium">Institution</h3>
                  <a href="https://www.iii.u-tokyo.ac.jp/" className={`text-xl ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-yellow-600'} transition-colors font-serif`} target="_blank" rel="noopener noreferrer">
                    {t('school')}
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20 shadow-lg`}
                >
                  <h3 className="text-sm uppercase tracking-wider text-yellow-600 mb-2 font-medium">Laboratory</h3>
                  <a href="https://lab.rekimoto.org/" className={`text-xl ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-yellow-600'} transition-colors font-serif`} target="_blank" rel="noopener noreferrer">
                    {t('Lab')}
                  </a>
                </motion.div>
              </div>

                             {/* Luxury statement section */}
               <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg border border-yellow-500/20 shadow-xl overflow-hidden`}>
                 <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-1">
                   <div className="flex">
                     {statementTabs.map((tab) => (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`flex-1 py-4 px-6 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                           activeTab === tab.id
                             ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                             : `${isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-700 hover:text-yellow-600'} hover:bg-yellow-500/10`
                         }`}
                       >
                         {tab.label}
                       </button>
                     ))}
                   </div>
                 </div>
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={`text-lg leading-relaxed font-serif ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {statementTabs[activeTab]?.content || ''}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Social links - luxury style */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 ${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-xl`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="text-yellow-600 text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Luxury interests */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <h3 className={`text-3xl text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Research Excellence
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    rotate: Math.random() * 6 - 3
                  }}
                  className={`${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm p-6 border border-green-500/20 shadow-lg text-center transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className={`font-serif ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{interest}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Design Pattern 8: Organic Biomorphic - Natural and fluid design
export function OrganicBiomorphicHome() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定
  const [activeTab, setActiveTab] = useState(0);
  const [blobPosition, setBlobPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBlobPosition({
        x: 30 + Math.random() * 40,
        y: 30 + Math.random() * 40
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const interests = [t('interest1'), t('interest2'), t('interest3'), t('interest4')];
  const statementTabs = [
    { id: 0, label: t('statementTab1'), content: t('statement') },
    // { id: 1, label: t('statementTab2'), content: t('statement2') }, // 読み、書き、AI
    // { id: 2, label: t('statementTab3'), content: t('statement3') }  // 情報文化技術
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Organic gradient background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'}`}>
        {/* Flowing blob shapes */}
        <motion.div
          animate={{
            x: `${blobPosition.x}%`,
            y: `${blobPosition.y}%`,
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className="absolute w-96 h-96 opacity-20"
          style={{
            background: `radial-gradient(ellipse 150% 100% at 50% 50%,
              rgba(34, 197, 94, 0.3) 0%,
              rgba(59, 130, 246, 0.2) 50%,
              rgba(147, 51, 234, 0.1) 100%)`,
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(20px)'
          }}
        />

        {/* Additional organic shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10 + i * 2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i
            }}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `linear-gradient(45deg,
                hsla(${120 + i * 30}, 70%, 60%, 0.3),
                hsla(${200 + i * 40}, 70%, 70%, 0.2))`,
              borderRadius: `${30 + i * 10}% ${70 - i * 5}% ${50 + i * 10}% ${30 + i * 15}% / ${40 + i * 5}% ${60 - i * 10}% ${70 + i * 5}% ${30 + i * 10}%`,
              filter: 'blur(15px)'
            }}
          />
        ))}
      </div>

      {/* Organic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 8}px`,
              height: `${2 + Math.random() * 8}px`,
              background: `hsla(${120 + Math.random() * 180}, 70%, 60%, 0.6)`
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              ease: "easeInOut",
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Organic header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <span
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {t('name')}
              </span>
            </h1>

            {/* Ornamental lines */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-500" />
              <div className="w-3 h-3 border border-yellow-500 rotate-45" />
              <p className={`text-xl tracking-[0.3em] uppercase ${isDark ? 'text-gray-300' : 'text-gray-700'} font-light`}>
                {t('roll')}
              </p>
              <div className="w-3 h-3 border border-yellow-500 rotate-45" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-500" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Organic portrait */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative group">
                {/* Flowing organic frame */}
                <motion.div
                  animate={{
                    borderRadius: [
                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                      '30% 60% 70% 40% / 50% 60% 30% 60%',
                      '60% 40% 30% 70% / 60% 30% 70% 40%'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-8 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 blur-xl"
                />

                <motion.div
                  animate={{
                    borderRadius: [
                      '40% 60% 60% 40% / 40% 40% 60% 60%',
                      '60% 40% 40% 60% / 60% 60% 40% 40%',
                      '40% 60% 60% 40% / 40% 40% 60% 60%'
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative overflow-hidden group-hover:scale-105 transition-transform duration-700"
                >
                  <Image
                    src="/images/myface.jpg"
                    alt="Keigo Minamida"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                    style={{ filter: 'saturate(120%) contrast(110%)' }}
                  />

                  {/* Organic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </div>
            </motion.div>

            {/* Flowing content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Organic info cards */}
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm p-6 border border-green-500/20 shadow-lg transition-all duration-300`}
                  style={{
                    borderRadius: '25px 10px 25px 10px',
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.05))'
                      : 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.1))'
                  }}
                >
                  <h3 className="text-sm uppercase tracking-wider text-green-600 mb-2 font-medium">Institution</h3>
                  <a href="https://www.iii.u-tokyo.ac.jp/" className={`text-xl ${isDark ? 'text-white hover:text-green-400' : 'text-gray-900 hover:text-green-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                    {t('school')}
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm p-6 border border-blue-500/20 shadow-lg transition-all duration-300`}
                  style={{
                    borderRadius: '10px 25px 10px 25px',
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05))'
                      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.1))'
                  }}
                >
                  <h3 className="text-sm uppercase tracking-wider text-blue-600 mb-2 font-medium">Laboratory</h3>
                  <a href="https://lab.rekimoto.org/" className={`text-xl ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors`} target="_blank" rel="noopener noreferrer">
                    {t('Lab')}
                  </a>
                </motion.div>
              </div>

              {/* Luxury statement section */}
              <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/80'} backdrop-blur-sm rounded-lg border border-yellow-500/20 shadow-xl overflow-hidden`}>
                <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-1">
                  <div className="flex">
                    {statementTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-4 px-6 text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                            : 'text-pink-400 hover:text-cyan-300 hover:bg-white/5'
                        }`}
                        style={activeTab === tab.id ? { textShadow: '0 0 15px rgba(0, 255, 255, 0.8)' } : {}}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={`text-lg leading-relaxed font-serif ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {statementTabs[activeTab]?.content || ''}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Social links - luxury style */}
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 ${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm border border-green-500/20 shadow-lg transition-all duration-300 hover:shadow-xl`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="text-yellow-600 text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Luxury interests */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <h3 className={`text-3xl text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Research Ecosystem
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    rotate: Math.random() * 6 - 3
                  }}
                  className={`${isDark ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm p-6 border border-green-500/20 shadow-lg text-center transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className={`font-serif ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{interest}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}