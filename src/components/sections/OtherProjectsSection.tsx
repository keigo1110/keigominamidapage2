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
    <section id="otherProjects" className="py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-semibold mb-6 tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            {t('otherProjects')}
          </h2>
          <div className={`w-24 h-0.5 mx-auto mb-6 ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className={`flex rounded-full p-1 ${
            isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
          }`}>
            {[
              { mode: 'minimal' as ViewMode, icon: Maximize2, label: 'Minimal view' },
              { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid view' },
              { mode: 'masonry' as ViewMode, icon: LayoutGrid, label: 'Masonry view' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  viewMode === mode
                    ? isDark
                      ? 'bg-[#2997FF] text-white shadow-lg'
                      : 'bg-[#0071E3] text-white shadow-lg'
                    : isDark
                      ? 'text-[#86868B] hover:text-[#F5F5F7]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
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
                        className="relative overflow-hidden rounded-2xl cursor-pointer"
                        style={{ aspectRatio: project.aspectRatio }}
                        onClick={() => setSelectedProject(index)}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="w-5 h-5 text-[#1D1D1F]" />
                        </motion.div>
                      </div>
                    </div>

                    <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                      <div>
                        <h3 className={`text-3xl font-light mb-4 ${
                          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                        }`}>
                          {project.title}
                        </h3>
                        <p className="text-base leading-relaxed text-[#86868B]">
                          {project.description}
                        </p>
                      </div>

                      <motion.button
                        onClick={() => setSelectedProject(index)}
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${
                          isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'
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
                  <div className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 ${
                    isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
                  }`}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: project.aspectRatio }}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white text-xl font-light mb-2">{project.title}</h3>
                        <p className="text-white/80 text-sm font-light line-clamp-2">{project.description}</p>
                      </motion.div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="p-5">
                        <h3 className={`text-lg font-light mb-1 ${
                          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
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
                className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`overflow-y-auto max-h-[90vh] ${isDark ? 'bg-[#1D1D1F]' : 'bg-white'}`}>
                  <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-md ${
                    isDark ? 'border-[#333336] bg-[#1D1D1F]/90' : 'border-[#D2D2D7] bg-white/90'
                  }`}>
                    <div className="flex items-center gap-4">
                      <h3 className={`text-2xl font-light ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                        {projects[selectedProject]?.title}
                      </h3>
                      <span className="text-sm text-[#86868B]">
                        {selectedProject + 1} / {projects.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isAutoPlay
                            ? isDark ? 'bg-[#2997FF] text-white' : 'bg-[#0071E3] text-white'
                            : isDark ? 'bg-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isDark ? 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#2C2C2E]' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                        }`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 p-6">
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden rounded-xl ${
                          isDark ? 'bg-[#2C2C2E]' : 'bg-[#F5F5F7]'
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateProject('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className={`text-lg font-light mb-4 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                          {t('aboutThisWork')}
                        </h4>
                        <p className="text-[#86868B] leading-relaxed text-lg font-light">
                          {projects[selectedProject]?.description}
                        </p>
                      </div>
                      {projects[selectedProject]?.links && projects[selectedProject].links.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3 text-sm text-[#86868B]">{t('relatedLinks')}</h5>
                          <div className="flex flex-wrap gap-3">
                            {projects[selectedProject].links.map((link, idx) => (
                              <motion.a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-light transition-colors ${
                                  isDark
                                    ? 'bg-[#2997FF] text-white hover:bg-[#2997FF]/90'
                                    : 'bg-[#0071E3] text-white hover:bg-[#0071E3]/90'
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
