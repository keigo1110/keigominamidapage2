'use client'

import { useState, useCallback, useMemo, useEffect, ReactElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaYoutube, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { X, ExternalLink, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid, Maximize2, Play, Pause, ZoomIn } from 'lucide-react'
import Image from 'next/image'

interface ProjectLink {
  icon: ReactElement
  text: string
  url: string
}

interface PersonalProject {
  id: string
  title: string
  description: string
  image: string
  aspectRatio: string
  links: ProjectLink[]
}

type ViewMode = 'minimal' | 'grid' | 'masonry'

export function OtherProjectsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects: PersonalProject[] = useMemo(() => [
    {
      id: 'room-management',
      title: t('oProject1'),
      description: t('oProject1Description'),
      image: "/images/robot_room.png",
      aspectRatio: '2/1',
      links: [
        { icon: <FaYoutube />, text: t('demoSwitch'), url: 'https://www.youtube.com/watch?v=XedxYF_UYmQ' },
        { icon: <FaYoutube />, text: t('demoDiscord'), url: 'https://www.youtube.com/watch?v=oPy740TgO-8' },
        { icon: <FaYoutube />, text: t('demoAA'), url: 'https://www.youtube.com/watch?v=5qL3k0K_MPc' }
      ]
    },
    {
      id: 'turtlebot-body',
      title: t('oProject2'),
      description: t('oProject2Description'),
      image: "/images/bodyop.png",
      aspectRatio: '2/1',
      links: [{ icon: <FaYoutube />, text: 'Demo', url: 'https://www.youtube.com/watch?v=-y6T3JDFr5Q' }]
    },
    {
      id: 'unilidar',
      title: t('oProject3'),
      description: t('oProject3Description'),
      image: "/images/unilidar.png",
      aspectRatio: '2.2/1',
      links: [{ icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/unilidar_sdk' }]
    },
    {
      id: 'minichro',
      title: t('oProject4'),
      description: t('oProject4Description'),
      image: "/images/minikuro-title.jpg",
      aspectRatio: '3.5/1',
      links: [
        { icon: <FaExternalLinkAlt />, text: t('demo'), url: 'https://myminichronology.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('usageGuide'), url: 'https://note.com/namida1110/n/nfd97132121ef' },
        { icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/myminichronology' }
      ]
    },
    {
      id: '4zigen-hp',
      title: t('oProject5'),
      description: t('oProject5Description'),
      image: "/images/4zigen_hp.png",
      aspectRatio: '2/1',
      links: [
        { icon: <FaExternalLinkAlt />, text: t('link4zigenSite'), url: 'https://4zigenhp.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork1Title'), url: 'https://geohp.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork2Title'), url: 'https://protophysicahp.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork3Title'), url: 'https://cotton-sketch-pen-hp.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork4Title'), url: 'https://metransfer.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork5Title'), url: 'https://puflica.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork6Title'), url: 'https://nozoko.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork7Title'), url: 'https://protozoahp.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('artwork8Title'), url: 'https://keigo1110.github.io/edgeofbubbles/' }
      ]
    },
    {
      id: 'rkmt-chronicle',
      title: t('oProject6'),
      description: t('oProject6Description'),
      image: "/images/rkmt-chronicle.png",
      aspectRatio: '2/1',
      links: [
        { icon: <FaExternalLinkAlt />, text: t('visitProjectWebsite'), url: 'https://rkmt-chronicle-viewer.vercel.app/' }
      ]
    },
    {
      id: 'lexiatlas',
      title: t('oProject7'),
      description: t('oProject7Description'),
      image: "/images/LexiAtlas.png",
      aspectRatio: '2/1',
      links: [
        { icon: <FaExternalLinkAlt />, text: t('demo'), url: 'https://wordtree-one.vercel.app/' },
        { icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/wordtree' }
      ]
    },
    {
      id: 'kaigi',
      title: t('oProject8'),
      description: t('oProject8Description'),
      image: "/images/kaigi.png",
      aspectRatio: '16/9',
      links: [
        { icon: <FaExternalLinkAlt />, text: t('visitProjectWebsite'), url: 'https://keigo1110.github.io/kAIgi-download/' }
      ]
    }
  ], [t])

  const navigateProject = useCallback((direction: 'prev' | 'next') => {
    if (selectedProject === null) return
    if (direction === 'prev') {
      setSelectedProject(selectedProject > 0 ? selectedProject - 1 : projects.length - 1)
    } else {
      setSelectedProject(selectedProject < projects.length - 1 ? selectedProject + 1 : 0)
    }
  }, [selectedProject, projects.length])

  useEffect(() => {
    if (!isAutoPlay || selectedProject === null) return
    const interval = setInterval(() => {
      navigateProject('next')
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlay, selectedProject, navigateProject])

  useEffect(() => {
    if (selectedProject === null) return
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); navigateProject('prev') }
      else if (e.key === 'ArrowRight') { e.preventDefault(); navigateProject('next') }
      else if (e.key === 'Escape') { e.preventDefault(); setSelectedProject(null) }
      else if (e.key === ' ') { e.preventDefault(); setIsAutoPlay(!isAutoPlay) }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedProject, navigateProject, isAutoPlay])

  useEffect(() => {
    if (selectedProject === null) return
    const totalLength = projects.length
    const prevIndex = selectedProject > 0 ? selectedProject - 1 : totalLength - 1
    const nextIndex = selectedProject < totalLength - 1 ? selectedProject + 1 : 0
    ;[prevIndex, nextIndex].forEach((index: number) => {
      const project = projects[index]
      if (project?.image) {
        const img = new window.Image()
        img.src = project.image
      }
    })
  }, [selectedProject, projects])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="otherProjects" className="world-play relative py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className={`mb-2 text-xs font-medium uppercase tracking-[0.18em] ${
            isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
          }`}>
            Personal
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            {t('otherProjects')}
          </h2>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex justify-start"
        >
          <div className={`flex rounded-lg p-1 ${
            isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
          }`}>
            {[
              { mode: 'minimal' as ViewMode, icon: Maximize2, label: 'Minimal view' },
              { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid view' },
              { mode: 'masonry' as ViewMode, icon: LayoutGrid, label: 'Masonry view' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`rounded-md p-2.5 transition-all duration-300 ${
                  viewMode === mode
                    ? isDark
                      ? 'bg-[#B8A04A]/20 text-[#D4C07A]'
                      : 'bg-[#8A7428]/12 text-[#8A7428]'
                    : isDark
                      ? 'text-[#9A958C] hover:text-[#F2EFE9]'
                      : 'text-[#7A756C] hover:text-[#1C1916]'
                }`}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`${
            viewMode === 'minimal'
              ? 'space-y-24'
              : viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
              : 'columns-1 md:columns-2 gap-8'
          }`}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {viewMode === 'minimal' ? (
                <div className="group">
                  <motion.div
                    className="grid md:grid-cols-2 gap-8 items-center"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div
                        className="relative cursor-pointer overflow-hidden rounded-sm"
                        style={{ aspectRatio: project.aspectRatio }}
                        onClick={() => setSelectedProject(index)}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F4EF]/92 shadow-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="h-5 w-5 text-[#1C1916]" />
                        </motion.div>
                      </div>
                    </div>

                    <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                      <div>
                        <h3 className={`mb-4 text-3xl font-light ${
                          isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                        }`}>
                          {project.title}
                        </h3>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                          {project.description}
                        </p>
                      </div>

                      <motion.button
                        onClick={() => setSelectedProject(index)}
                        whileHover={{ x: 4 }}
                        className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${
                          isDark ? 'text-[#D4C07A] hover:text-[#B8A04A]' : 'text-[#8A7428] hover:text-[#6F5C1F]'
                        }`}
                      >
                        {t('viewFullDetails')}
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(index)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden rounded-sm transition-all duration-500 ${
                    isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
                  }`}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: project.aspectRatio }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="mb-2 text-xl font-light text-white">{project.title}</h3>
                        <p className="line-clamp-2 text-sm font-light text-white/80">{project.description}</p>
                      </motion.div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="p-5">
                        <h3 className={`mb-1 text-lg font-light ${
                          isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                        }`}>
                          {project.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`max-h-[90vh] overflow-y-auto ${isDark ? 'bg-[#0C0B0A]' : 'bg-[#F7F4EF]'}`}>
                  <div className={`sticky top-0 z-10 flex items-center justify-between border-b p-6 backdrop-blur-md ${
                    isDark ? 'border-[#2A2724] bg-[#0C0B0A]/90' : 'border-[#E4DFD6] bg-[#F7F4EF]/90'
                  }`}>
                    <div className="flex items-center gap-4">
                      <h3 className={`text-2xl font-light ${isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}`}>
                        {projects[selectedProject]?.title}
                      </h3>
                      <span className={`text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                        {selectedProject + 1} / {projects.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`rounded-full p-2.5 transition-colors ${
                          isAutoPlay
                            ? isDark ? 'bg-[#B8A04A]/25 text-[#D4C07A]' : 'bg-[#8A7428]/15 text-[#8A7428]'
                            : isDark ? 'bg-[#161412] text-[#9A958C] hover:text-[#F2EFE9]' : 'bg-[#EFE9E0] text-[#7A756C] hover:text-[#1C1916]'
                        }`}
                      >
                        {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className={`rounded-full p-2.5 transition-colors ${
                          isDark ? 'text-[#9A958C] hover:bg-[#161412] hover:text-[#F2EFE9]' : 'text-[#7A756C] hover:bg-[#EFE9E0] hover:text-[#1C1916]'
                        }`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-8 p-6 lg:grid-cols-2">
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden rounded-sm ${
                          isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
                        }`}
                        style={{ aspectRatio: projects[selectedProject]?.aspectRatio || '16/9' }}
                      >
                        <Image
                          src={projects[selectedProject]?.image || ''}
                          alt={projects[selectedProject]?.title || ''}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      <button
                        onClick={() => navigateProject('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateProject('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className={`mb-4 text-lg font-light ${isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}`}>
                          {t('aboutThisWork')}
                        </h4>
                        <p className={`text-lg font-light leading-relaxed ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                          {projects[selectedProject]?.description}
                        </p>
                      </div>
                      {projects[selectedProject]?.links && projects[selectedProject].links.length > 0 && (
                        <div>
                          <h5 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>{t('relatedLinks')}</h5>
                          <div className="flex flex-wrap gap-3">
                            {projects[selectedProject].links.map((link, idx) => (
                              <motion.a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-light transition-colors ${
                                  isDark
                                    ? 'bg-[#B8A04A]/18 text-[#D4C07A] hover:bg-[#B8A04A]/28'
                                    : 'bg-[#8A7428]/12 text-[#8A7428] hover:bg-[#8A7428]/18'
                                }`}
                              >
                                <ExternalLink className="w-4 h-4" />
                                {link.text}
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
