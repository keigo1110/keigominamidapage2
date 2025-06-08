'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '../../contexts/TranslationContext'
import { ExternalLink, Github, Zap } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  featured?: boolean
  demo?: string
}

export function RefinedOtherProjectsSection() {
  const { t } = useTranslation()
  const isDark = true // ダークモード固定

  const projects: Project[] = [
    {
      title: t('oProject1'),
      description: t('oProject1Description'),
      technologies: ['Node.js', 'Express', 'RFID', 'Discord Bot'],
      github: 'https://github.com/keigo9/entrance-management',
      demo: t('demoDiscord'),
      featured: true
    },
    {
      title: t('oProject2'),
      description: t('oProject2Description'),
      technologies: ['ROS', 'Python', 'OpenCV', 'TurtleBot3'],
      github: 'https://github.com/keigo9/turtlebot-body-control',
      featured: true
    },
    {
      title: t('oProject3'),
      description: t('oProject3Description'),
      technologies: ['Python', 'WebGL', 'Three.js', 'LiDAR'],
      github: 'https://github.com/keigo9/unitree-lidar-viz',
      link: 'https://keigo9.github.io/Uni-lidar-web/',
      demo: t('repository')
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="other-projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('otherProjects')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Exploring innovative solutions across different domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              } ${
                project.featured ? 'ring-2 ring-opacity-50 ' + (isDark ? 'ring-indigo-500' : 'ring-indigo-400') : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                    isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-500/10 text-indigo-600'
                  }`}>
                    <Zap className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}

              <div className="p-6">
                <div className="mb-4">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} transition-all duration-300`}>
                    {project.title}
                  </h3>
                  
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-xs rounded-full ${
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
                <div className="flex items-center gap-3">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark
                          ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {project.demo || 'View Project'}
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </Link>
                  )}
                </div>

                {/* Hover effect gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${colors.primary[500]} to-${colors.secondary[500]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="https://github.com/keigo9"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            <Github className="w-5 h-5" />
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  )
}