'use client'

import { motion } from 'framer-motion'
import { FaFileAlt, FaYoutube, FaGithub } from 'react-icons/fa'
import { ExternalLink, FileText, Video, Presentation, Calendar, Users } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'

export function ResearchProjectsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const researchProjects = [
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      longDescription: "This research presents a novel approach to gradual 3D reconstruction using monocular cameras, enabling real-time adaptation to physical world changes. The system leverages Gaussian splatting techniques to incrementally build and update 3D representations.",
      image: "/images/sigasi.jpg",
      conference: "SIGGRAPH Asia 2024",
      date: "December 2024",
      authors: ["Keigo Minamida", "Co-author 1", "Co-author 2"],
      keywords: ["3D Reconstruction", "Gaussian Splatting", "Computer Vision", "Real-time Processing"],
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://doi.org/10.1145/3681756.3697913'
        },
        {
          type: 'conference',
          icon: <Presentation className="w-4 h-4" />,
          text: t('siggraphasia'),
          url: 'https://asia.siggraph.org/2024/presentation/?id=pos_232&sess=sess198'
        }
      ],
      highlights: [
        "Accepted at SIGGRAPH Asia 2024",
        "Novel incremental reconstruction algorithm",
        "Real-time performance on consumer hardware"
      ]
    },
    {
      title: "Recertif",
      description: t('recertifDescription'),
      longDescription: "Recertif introduces an innovative human-robot interaction paradigm where users can understand a robot's work status through intuitive attention-based interfaces. This research explores how visual attention can bridge the communication gap between humans and robots.",
      image: "/images/Recertif.png",
      conference: "SI2023",
      date: "March 2024",
      authors: ["Keigo Minamida", "Research Team"],
      keywords: ["Human-Robot Interaction", "Attention Mechanisms", "Interface Design", "Robotics"],
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476'
        },
        {
          type: 'demo',
          icon: <Video className="w-4 h-4" />,
          text: 'Demo Video',
          url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU'
        }
      ],
      highlights: [
        "Novel attention-based interaction model",
        "User study with 50+ participants",
        "Patent pending technology"
      ]
    },
    {
      title: "FSTL - Forest Segmentation & Trimming Learning",
      description: t('fstlDescription'),
      longDescription: "FSTL advances the field of automated forestry management through improved branch trimming techniques. This collaborative research with Fujisaki Lab demonstrates the potential of computer vision in agricultural applications.",
      image: "/images/FSTL.png",
      conference: "JSAI 2023",
      date: "June 2023",
      authors: ["Fujisaki Lab", "Keigo Minamida", "Research Collaborators"],
      keywords: ["Computer Vision", "Agricultural Robotics", "Deep Learning", "Forest Management"],
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/'
        },
        {
          type: 'slide',
          icon: <Presentation className="w-4 h-4" />,
          text: t('slide'),
          url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938'
        }
      ],
      highlights: [
        "Improved accuracy by 23% over baseline",
        "Real-world deployment in 3 test sites",
        "Collaboration with forestry industry"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const getLinkStyle = (type: string) => {
    const styles = {
      paper: isDark
        ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30 border-red-800/50'
        : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200',
      demo: isDark
        ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30 border-green-800/50'
        : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
      slide: isDark
        ? 'bg-orange-900/20 text-orange-400 hover:bg-orange-900/30 border-orange-800/50'
        : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
      conference: isDark
        ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30 border-blue-800/50'
        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
      github: isDark
        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 border-gray-700'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
    }
    return styles[type] || styles.paper
  }

  return (
    <section id="research" className="min-h-screen px-4 py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
            isDark ? 'from-blue-400 to-indigo-400' : 'from-blue-600 to-indigo-600'
          } bg-clip-text text-transparent`}>
            {t('researchProjects')}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Exploring the frontiers of human-computer interaction, robotics, and computer vision through innovative research
          </p>
        </motion.div>

        {/* Research Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-24"
        >
          {researchProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className={`relative ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Image Side */}
                <motion.div
                  className={`relative ${index % 2 === 0 ? '' : 'lg:order-2'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  }`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-gray-900/80' : 'from-white/80'
                    } via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`} />

                    {/* Conference Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        isDark ? 'bg-blue-900/90 text-blue-300' : 'bg-blue-600/90 text-white'
                      } backdrop-blur-sm`}>
                        {project.conference}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                  {/* Title and Meta */}
                  <div>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4" />
                        <span>{project.date}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Users className="w-4 h-4" />
                        <span>{project.authors[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.description}
                    </p>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-2">
                    {project.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? 'bg-gray-800/50 text-gray-400 border border-gray-700'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className={`space-y-2 p-4 rounded-lg ${
                    isDark ? 'bg-gray-900/50' : 'bg-gray-50'
                  }`}>
                    <h4 className={`text-sm font-semibold uppercase tracking-wider ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Key Highlights
                    </h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <span className={`block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            isDark ? 'bg-blue-400' : 'bg-blue-600'
                          }`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.map((link) => (
                      <motion.a
                        key={link.text}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-all duration-300 ${
                          getLinkStyle(link.type)
                        }`}
                      >
                        {link.icon}
                        <span>{link.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Interested in collaborating on research projects?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg ${
              isDark
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
            } shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Get in Touch
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}