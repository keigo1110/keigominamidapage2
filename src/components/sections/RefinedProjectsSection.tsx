'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { colors } from '../../utils/refined-styles'

export function RefinedProjectsSection() {
  const isDark = true // ダークモード固定
  const { t } = useTranslation()

  const projects = [
    {
      title: 'Uni-lidar',
      subtitle: t('uniLidarSubtitle'),
      description: t('uniLidarDescription'),
      techStack: ['Python', 'React', 'WebRTC', 'C++', 'ROS2'],
      image: '/images/unilidar.png',
      links: {
        website: 'https://keigo9.github.io/Uni-lidar-web/',
        github: 'https://github.com/keigo9/Uni-lidar-web'
      }
    },
    {
      title: t('bodyOptimizationTitle'),
      subtitle: t('bodyOptimizationSubtitle'),
      description: t('bodyOptimizationDescription'),
      techStack: ['Nuxt.js', 'Vue.js', 'Firebase', 'TypeScript'],
      image: '/images/bodyop.png',
      links: {
        website: 'https://www.bodyoptimization.net/'
      }
    },
    {
      title: t('robotCompetitionTitle'),
      subtitle: t('robotCompetitionSubtitle'),
      description: t('robotCompetitionDescription'),
      techStack: ['Python', 'OpenCV', 'Arduino', 'C'],
      image: '/images/robot_room.png',
      links: {}
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section id="projects" className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('projectsTitle')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            {t('projectsDescription')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              } transition-all duration-300`}
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`absolute inset-[1px] rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`} />
              
              <div className="relative z-10">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-gray-900' : 'from-white'
                  } to-transparent opacity-60`} />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-1 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.subtitle}
                  </p>
                  <p className={`text-sm mb-4 line-clamp-3 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark 
                            ? 'bg-gray-800 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links.website && (
                      <motion.a
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark 
                            ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30' 
                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                        } transition-colors`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                          isDark 
                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#startup"
            whileHover={{ x: 5 }}
            className={`inline-flex items-center gap-2 text-lg font-medium ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            } hover:underline`}
          >
            {t('viewMoreProjects')}
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}