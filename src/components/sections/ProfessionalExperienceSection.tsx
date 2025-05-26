'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import {
  ExternalLink,
  Zap,
  Clock,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
  Layers,
  BarChart3,
  Filter,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import Image from 'next/image'

interface Experience {
  id: string
  logo: string
  title: string
  position: string
  date: string
  year: string
  month: string
  startDate: Date
  endDate: Date
  links: { text: string; url: string }[]
  color: string
  highlight?: string
  department?: string
  achievements?: string[]
  technologies?: string[]
  impact?: string
}

interface TimelineMonth {
  year: number
  month: number
  date: Date
  projects: Experience[]
  isActive: boolean
}

type ViewMode = 'detailed' | 'compact' | 'overview'
type FilterMode = 'all' | 'active' | 'completed'

export function ProfessionalExperienceSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('detailed')
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)
  const [isZoomedOut, setIsZoomedOut] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const experiences: Experience[] = useMemo(() => [
    {
      id: '1000sen-restart',
      logo: "/images/1000ya.png",
      title: "1000sen team Restart",
      position: "再始動プロジェクト",
      date: "2025年5月〜",
      year: '2025',
      month: '05',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-12-31'),
      color: '#FF6B6B',
      highlight: 'Latest Project',
      department: 'Creative Technology',
      achievements: ['チーム再編成', '新戦略策定', 'プロジェクト復活'],
      technologies: ['Strategy', 'Leadership', 'Innovation'],
      impact: 'Revitalizing dormant creative initiatives',
      links: [
        { text: '1000sen team', url: 'https://1000ya.isis.ne.jp/' }
      ]
    },
    {
      id: 'iii-exhibition',
      logo: "/images/iii.jpg",
      title: t('experience1'),
      position: t('experience1Description'),
      date: t('experience1Date'),
      year: '2024',
      month: '04',
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-11-30'),
      color: '#3B82F6',
      department: 'Exhibition Design',
      achievements: ['国際展示会出展', 'アートディレクション', '来場者数1000人超'],
      technologies: ['Interactive Design', 'Web Development', 'Digital Art'],
      impact: 'Bridging traditional art with digital innovation',
      links: [
        { text: t('experience1Link1'), url: 'https://www.iiiexhibition.com/' },
        { text: t('experience1Link2'), url: 'https://iii-exhibition-2024-web.vercel.app/' }
      ]
    },
    {
      id: '1000ya',
      logo: "/images/1000ya.png",
      title: t('experience2'),
      position: t('experience2Description'),
      date: t('experience2Date'),
      year: '2023',
      month: '04',
      startDate: new Date('2023-04-01'),
      endDate: new Date('2024-07-31'),
      color: '#8B5CF6',
      department: 'Content Strategy',
      achievements: ['継続的コンテンツ制作', '読者エンゲージメント向上', 'ブランド認知度拡大'],
      technologies: ['Content Management', 'Digital Publishing', 'Analytics'],
      impact: 'Establishing thought leadership in creative industries',
      links: [
        { text: t('experience2Link1'), url: 'https://1000ya.isis.ne.jp/1850.html' },
        { text: t('experience2Link2'), url: 'https://1000ya.isis.ne.jp/1849.html' },
        { text: t('experience2Link3'), url: 'https://1000ya.isis.ne.jp/1848.html' },
        { text: t('experience2Link4'), url: 'https://1000ya.isis.ne.jp/1847.html' },
        { text: t('experience2Link5'), url: 'https://1000ya.isis.ne.jp/1846.html' }
      ]
    },
    {
      id: 'ha-project',
      logo: "/images/ha.png",
      title: t('experience3'),
      position: t('experience3Description'),
      date: t('experience3Date'),
      year: '2022',
      month: '01',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2022-11-30'),
      color: '#EC4899',
      department: 'Research & Development',
      achievements: ['学術研究発表', '特別賞受賞', '学会発表3回'],
      technologies: ['Academic Research', 'Data Analysis', 'Publication'],
      impact: 'Contributing to academic discourse in digital humanities',
      links: [
        { text: t('experience3Link1'), url: 'https://edist.ne.jp/list/82kanmon_51ha_shusseuo/' },
        { text: t('experience3Link2'), url: 'https://edist.ne.jp/list/83kanmon_51ha_book/' },
        { text: t('experience3Link3'), url: 'https://edist.ne.jp/just/kanmon83_hyper_p-1/' }
      ]
    },
    {
      id: 'shu-project',
      logo: "/images/shu.png",
      title: t('experience4'),
      position: t('experience4Description'),
      date: t('experience4Date'),
      year: '2020',
      month: '09',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2021-03-31'),
      color: '#10B981',
      department: 'Digital Publishing',
      achievements: ['デジタル出版プラットフォーム構築', 'コンテンツ管理システム開発', 'ユーザビリティ改善'],
      technologies: ['Web Development', 'Content Management', 'UI/UX Design'],
      impact: 'Revolutionizing traditional publishing workflows',
      links: [
        { text: t('experience4Link1'), url: 'https://edist.ne.jp/list/81kanmon_51shu_names/' },
        { text: t('experience4Link2'), url: 'https://edist.ne.jp/list/82kanmon_51shu_book/' },
        { text: t('experience4Link3'), url: 'https://edist.ne.jp/post/51syu_ruijisoji/' }
      ]
    }
  ], [t])

  // Timeline calculations
  const timelineData = useMemo(() => {
    if (experiences.length === 0) return { months: [], totalMonths: 0, startDate: new Date(), endDate: new Date() }

    const dates = experiences.flatMap(exp => [exp.startDate, exp.endDate])
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

    // Extend timeline slightly for better visualization
    const startDate = new Date(minDate.getFullYear(), minDate.getMonth() - 1, 1)
    const endDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 2, 0)

    const months: TimelineMonth[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      const monthProjects = experiences.filter(exp => {
        const monthStart = new Date(current.getFullYear(), current.getMonth(), 1)
        const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0)
        return exp.startDate <= monthEnd && exp.endDate >= monthStart
      })

      months.push({
        year: current.getFullYear(),
        month: current.getMonth(),
        date: new Date(current),
        projects: monthProjects,
        isActive: monthProjects.length > 0
      })

      current.setMonth(current.getMonth() + 1)
    }

    return {
      months,
      totalMonths: months.length,
      startDate,
      endDate
    }
  }, [experiences])

  // Filter experiences based on current filters
  const filteredExperiences = useMemo(() => {
    let filtered = experiences

    if (selectedYear) {
      filtered = filtered.filter(exp =>
        exp.startDate.getFullYear() <= parseInt(selectedYear) &&
        exp.endDate.getFullYear() >= parseInt(selectedYear)
      )
    }

    if (filterMode === 'active') {
      filtered = filtered.filter(exp => exp.endDate > new Date())
    } else if (filterMode === 'completed') {
      filtered = filtered.filter(exp => exp.endDate <= new Date())
    }

    return filtered
  }, [experiences, selectedYear, filterMode])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIndex(prev => {
        if (prev === null) return 0
        return prev >= filteredExperiences.length - 1 ? 0 : prev + 1
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlay, filteredExperiences.length])

  // Project expansion toggle
  const toggleProjectExpansion = useCallback((projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }, [])

  // Calculate project position and width for gantt chart
  const calculateProjectDimensions = useCallback((experience: Experience) => {
    const { months, totalMonths } = timelineData
    if (totalMonths === 0) return { left: 0, width: 0 }

    const startIndex = months.findIndex(month =>
      month.year === experience.startDate.getFullYear() &&
      month.month === experience.startDate.getMonth()
    )

    const endIndex = months.findIndex(month =>
      month.year === experience.endDate.getFullYear() &&
      month.month === experience.endDate.getMonth()
    )

    if (startIndex === -1 || endIndex === -1) return { left: 0, width: 0 }

    const left = (startIndex / totalMonths) * 100
    const width = ((endIndex - startIndex + 1) / totalMonths) * 100

    return { left, width }
  }, [timelineData])

  // Scroll animation transforms
  const timelineScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50])

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800'
            : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'
        }`} />

        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full px-6 md:px-8 lg:px-12 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}
            >
              <Clock className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>

            <h2 className={`text-5xl md:text-6xl font-light tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('experience')}
            </h2>

            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`p-3 rounded-full ${isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'}`}
            >
              <TrendingUp className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </motion.div>
          </div>

          <motion.p
            className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto font-light leading-relaxed mb-8`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Professional journey through creative technology and digital innovation
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div variants={itemVariants}>
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {experiences.length}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Projects
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {Math.round(timelineData.totalMonths / 12 * 10) / 10}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Years Active
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className={`text-3xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {experiences.filter(exp => exp.endDate > new Date()).length}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Projects
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`rounded-2xl p-6 mb-12 ${
            isDark ? 'bg-gray-900/50' : 'bg-white/80'
          } backdrop-blur-sm border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } shadow-xl`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                View:
              </span>
              <div className={`flex rounded-lg p-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {(['detailed', 'compact', 'overview'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-blue-600 text-white shadow-md'
                        : isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter:
              </span>
              <div className={`flex rounded-lg p-1 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {(['all', 'active', 'completed'] as FilterMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      filterMode === mode
                        ? 'bg-green-600 text-white shadow-md'
                        : isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Year:
              </span>
              <div className="flex gap-2">
                {Array.from(new Set(experiences.flatMap(exp => [
                  exp.startDate.getFullYear(),
                  exp.endDate.getFullYear()
                ]))).sort().map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => setSelectedYear(selectedYear === year.toString() ? null : year.toString())}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      selectedYear === year.toString()
                        ? 'bg-purple-600 text-white shadow-md'
                        : isDark
                          ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Auto-play & Zoom Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <motion.button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2 rounded-md transition-all ${
                  isAutoPlay
                    ? 'bg-blue-600 text-white'
                    : isDark
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </motion.button>

              <motion.button
                onClick={() => setIsZoomedOut(!isZoomedOut)}
                className={`p-2 rounded-md transition-all ${
                  isZoomedOut
                    ? 'bg-orange-600 text-white'
                    : isDark
                      ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isZoomedOut ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </motion.button>

              <motion.button
                onClick={() => {
                  setSelectedYear(null)
                  setFilterMode('all')
                  setActiveIndex(null)
                  setExpandedProjects(new Set())
                }}
                className={`p-2 rounded-md transition-all ${
                  isDark
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Professional Gantt Chart */}
        <motion.div
          ref={timelineRef}
          style={{ scale: timelineScale }}
          className="relative"
        >
          <div className={`rounded-2xl border ${
            isDark ? 'bg-gray-900/70' : 'bg-white/90'
          } ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } backdrop-blur-sm shadow-2xl overflow-hidden`}>

            {/* Timeline Header */}
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  ref={topRef}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Project Timeline
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {filteredExperiences.length} of {experiences.length} projects shown
                    </p>
                  </div>
                </motion.div>

                <div className="flex items-center gap-4">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-right`}>
                    <div>Timeline Span</div>
                    <div className="font-medium">
                      {timelineData.startDate.getFullYear()} - {timelineData.endDate.getFullYear()}
                    </div>
                  </div>

                  <motion.div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'
                    }`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Live Data
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Month Scale */}
              <div className="relative overflow-x-auto">
                <div className="flex items-center min-w-full" style={{ minWidth: '800px' }}>
                  {timelineData.months.map((month, index) => {
                    const isYearStart = month.month === 0
                    const isCurrentMonth = new Date().getFullYear() === month.year &&
                                         new Date().getMonth() === month.month

                    return (
                      <motion.div
                        key={`${month.year}-${month.month}`}
                        className="flex-1 flex flex-col items-center relative group"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.02 }}
                        onMouseEnter={() => setHoveredMonth(index)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        {/* Month marker */}
                        <div className={`w-3 h-3 rounded-full mb-2 transition-all ${
                          isCurrentMonth
                            ? 'bg-red-500 shadow-lg shadow-red-500/50'
                            : month.isActive
                              ? isDark ? 'bg-blue-400' : 'bg-blue-600'
                              : isDark ? 'bg-gray-700' : 'bg-gray-300'
                        } ${hoveredMonth === index ? 'scale-150' : ''}`} />

                        {/* Year label */}
                        {isYearStart && (
                          <div className={`text-lg font-bold mb-1 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {month.year}
                          </div>
                        )}

                        {/* Month label */}
                        <div className={`text-xs ${
                          month.isActive
                            ? isDark ? 'text-blue-400' : 'text-blue-600'
                            : isDark ? 'text-gray-500' : 'text-gray-500'
                        } ${isYearStart ? 'font-medium' : ''}`}>
                          {month.date.toLocaleDateString('en', { month: 'short' })}
                        </div>

                        {/* Activity indicator */}
                        {month.projects.length > 0 && (
                          <motion.div
                            className={`mt-1 text-xs px-2 py-0.5 rounded-full ${
                              isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredMonth === index ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {month.projects.length}
                          </motion.div>
                        )}

                        {/* Current month indicator */}
                        {isCurrentMonth && (
                          <motion.div
                            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-red-500 text-white text-xs rounded-md"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Now
                          </motion.div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Timeline base line with gradient */}
                <div className={`absolute top-6 left-0 right-0 h-1 rounded-full ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-900/30 via-blue-500/60 to-purple-900/30'
                    : 'bg-gradient-to-r from-blue-200 via-blue-400 to-purple-200'
                }`} />
              </div>
            </div>

            {/* Gantt Chart Body */}
            <div className="p-6 space-y-4">
              <AnimatePresence mode="wait">
                {filteredExperiences.map((experience, index) => {
                  const dimensions = calculateProjectDimensions(experience)
                  const isExpanded = expandedProjects.has(experience.id)
                  const isActive = activeIndex === index
                  const isOngoing = experience.endDate > new Date()

                  return (
                    <motion.div
                      key={experience.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isActive ? 1.02 : 1
                      }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        layout: { duration: 0.3 }
                      }}
                      className={`relative group cursor-pointer ${
                        viewMode === 'compact' ? 'py-2' : 'py-3'
                      }`}
                      onClick={() => {
                        setActiveIndex(activeIndex === index ? null : index)
                        toggleProjectExpansion(experience.id)
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {/* Project Header */}
                      <div className="flex items-center gap-4 mb-3">
                        {/* Logo */}
                        <motion.div
                          className={`flex-shrink-0 ${
                            viewMode === 'compact' ? 'w-8 h-8' : 'w-12 h-12'
                          } rounded-xl overflow-hidden shadow-md border-2 ${
                            isDark ? 'border-gray-700' : 'border-gray-200'
                          } transition-all`}
                          whileHover={{
                            scale: 1.1,
                            rotate: isActive ? 5 : 0,
                            borderColor: experience.color
                          }}
                          animate={{
                            scale: isActive ? 1.05 : 1,
                            borderColor: isActive ? experience.color : undefined
                          }}
                        >
                          <Image
                            src={experience.logo}
                            alt={experience.title}
                            width={viewMode === 'compact' ? 32 : 48}
                            height={viewMode === 'compact' ? 32 : 48}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className={`${
                              viewMode === 'compact' ? 'text-base' : 'text-lg'
                            } font-semibold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                              {experience.title}
                            </h3>

                            {/* Status indicators */}
                            <div className="flex items-center gap-2">
                              {experience.highlight && (
                                <motion.div
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg flex items-center gap-1"
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Zap className="w-3 h-3" />
                                  {experience.highlight}
                                </motion.div>
                              )}

                              {isOngoing && (
                                <motion.div
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400"
                                  animate={{ opacity: [0.5, 1, 0.5] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  Active
                                </motion.div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                              {experience.position}
                            </p>

                            {experience.department && viewMode !== 'compact' && (
                              <div className={`flex items-center gap-1 text-xs ${
                                isDark ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                <MapPin className="w-3 h-3" />
                                {experience.department}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <motion.button
                          className={`p-2 rounded-lg transition-all ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                        >
                          <ChevronDown className={`w-4 h-4 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                        </motion.button>
                      </div>

                      {/* Timeline Bar Container */}
                      <div className={`relative ${viewMode === 'compact' ? 'h-8' : 'h-12'} mb-3`}>
                        {/* Background Track */}
                        <div className={`absolute inset-0 rounded-lg ${
                          isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'
                        } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`} />

                        {/* Progress Bar */}
                        <motion.div
                          className="absolute top-1 bottom-1 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden"
                          style={{
                            left: `${dimensions.left}%`,
                            width: `${dimensions.width}%`,
                            backgroundColor: experience.color,
                          }}
                          initial={{ width: 0, opacity: 0.7 }}
                          animate={{
                            width: `${dimensions.width}%`,
                            opacity: isActive ? 1 : 0.8,
                            scale: isActive ? 1.02 : 1
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.02,
                            boxShadow: `0 10px 25px ${experience.color}40`
                          }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        >
                          {/* Gradient overlay */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${experience.color}dd, ${experience.color}, ${experience.color}bb)`
                            }}
                          />

                          {/* Bar content */}
                          <div className="relative h-full flex items-center justify-between px-3 text-white">
                            <div className="flex items-center gap-2">
                              <motion.div
                                className="w-2 h-2 bg-white/90 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-xs font-medium">
                                {experience.startDate.getFullYear()}
                              </span>
                            </div>

                            {viewMode !== 'compact' && dimensions.width > 15 && (
                              <span className="text-xs font-medium">
                                {experience.endDate.getFullYear()}
                              </span>
                            )}
                          </div>

                          {/* Ongoing project animation */}
                          {isOngoing && (
                            <motion.div
                              className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}

                          {/* Hover tooltip */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                className={`absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-10 ${
                                  isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-200'
                                } shadow-xl`}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="text-center">
                                  <div className="font-semibold">{experience.date}</div>
                                  {experience.impact && (
                                    <div className="text-xs mt-1 opacity-75">{experience.impact}</div>
                                  )}
                                </div>

                                {/* Tooltip arrow */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                                  isDark ? 'border-t-gray-800' : 'border-t-white'
                                }`} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Duration and metrics */}
                        <motion.div
                          className="absolute -right-20 top-1/2 -translate-y-1/2 text-right"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isActive ? 1 : 0.6, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`text-xs font-medium ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {Math.ceil((experience.endDate.getTime() - experience.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))} mo
                          </div>
                          {experience.achievements && (
                            <div className={`text-xs ${
                              isDark ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              {experience.achievements.length} items
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              className={`p-6 rounded-lg ${
                                isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
                              } border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
                              initial={{ y: -20 }}
                              animate={{ y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Achievements */}
                                {experience.achievements && (
                                  <div>
                                    <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                                      isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      <TrendingUp className="w-4 h-4" />
                                      Key Achievements
                                    </h4>
                                    <div className="space-y-2">
                                      {experience.achievements.map((achievement, idx) => (
                                        <motion.div
                                          key={idx}
                                          className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-start gap-2`}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                                          {achievement}
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Technologies */}
                                {experience.technologies && (
                                  <div>
                                    <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                                      isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      <Layers className="w-4 h-4" />
                                      Technologies
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {experience.technologies.map((tech, idx) => (
                                        <motion.span
                                          key={idx}
                                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                          }`}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: idx * 0.05 }}
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          {tech}
                                        </motion.span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Links */}
                                <div>
                                  <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    <ExternalLink className="w-4 h-4" />
                                    Project Links
                                  </h4>
                                  <div className="space-y-2">
                                    {experience.links.map((link, idx) => (
                                      <motion.a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105"
                                        style={{
                                          backgroundColor: `${experience.color}15`,
                                          color: experience.color,
                                          borderColor: `${experience.color}30`
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{
                                          backgroundColor: `${experience.color}25`,
                                          scale: 1.05
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {link.text}
                                        <ExternalLink className="w-3 h-3" />
                                      </motion.a>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Impact Statement */}
                              {experience.impact && (
                                <motion.div
                                  className={`mt-6 p-4 rounded-lg ${
                                    isDark ? 'bg-gray-700/30' : 'bg-white/70'
                                  } border-l-4`}
                                  style={{ borderLeftColor: experience.color }}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <div className={`text-sm font-medium mb-2 ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                  }`}>
                                    Impact & Vision
                                  </div>
                                  <div className={`text-sm ${
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                  }`}>
                                    {experience.impact}
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Enhanced Footer */}
            <div className={`p-6 border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} ${
              isDark ? 'bg-gray-800/20' : 'bg-gray-50/50'
            }`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-2`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Interactive timeline - Click bars for details
                  </div>

                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-1`}>
                    <Calendar className="w-3 h-3" />
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => {
                      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronUp className="w-4 h-4" />
                    Back to Top
                  </motion.button>

                  {/* Quick actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setViewMode(viewMode === 'detailed' ? 'compact' : 'detailed')}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Toggle view mode"
                    >
                      <Layers className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    </motion.button>

                    <motion.button
                      onClick={() => window.open('mailto:contact@example.com?subject=Project Collaboration', '_blank')}
                      className={`p-2 rounded-lg transition-all ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Contact for collaboration"
                    >
                      <ExternalLink className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Statistics Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: 'Total Duration',
                value: `${Math.round(timelineData.totalMonths / 12 * 10) / 10}y`,
                icon: Clock,
                color: 'blue',
                description: 'Years of professional experience'
              },
              {
                label: 'Active Projects',
                value: experiences.filter(exp => exp.endDate > new Date()).length,
                icon: TrendingUp,
                color: 'green',
                description: 'Currently ongoing initiatives'
              },
              {
                label: 'Technologies',
                value: new Set(experiences.flatMap(exp => exp.technologies || [])).size,
                icon: Layers,
                color: 'purple',
                description: 'Different technologies used'
              },
              {
                label: 'Achievements',
                value: experiences.reduce((sum, exp) => sum + (exp.achievements?.length || 0), 0),
                icon: Zap,
                color: 'orange',
                description: 'Key milestones reached'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-900/50' : 'bg-white/80'
                } backdrop-blur-sm border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: isDark
                    ? '0 20px 40px rgba(0,0,0,0.3)'
                    : '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <motion.div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: `rgb(${
                        stat.color === 'blue' ? '59 130 246' :
                        stat.color === 'green' ? '34 197 94' :
                        stat.color === 'purple' ? '139 92 246' : '249 115 22'
                      } / 0.2)`
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <stat.icon
                      className="w-6 h-6"
                      style={{
                        color: `rgb(${
                          stat.color === 'blue' ? '59 130 246' :
                          stat.color === 'green' ? '34 197 94' :
                          stat.color === 'purple' ? '139 92 246' : '249 115 22'
                        })`
                      }}
                    />
                  </motion.div>
                  <div>
                    <motion.div
                      className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {stat.label}
                    </div>
                  </div>
                </div>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
              isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100/50 text-gray-600'
            } text-sm backdrop-blur-sm border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                '0 4px 20px rgba(0,0,0,0.1)',
                '0 8px 30px rgba(0,0,0,0.15)',
                '0 4px 20px rgba(0,0,0,0.1)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-4 h-4" />
            </motion.div>
            Professional journey continues...
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}