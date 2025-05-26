'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ExternalLink, Zap, Clock, TrendingUp } from 'lucide-react'
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
}

export function ExperienceSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)



  const experiences: Experience[] = [
    {
      id: '1000sen-restart',
      logo: "/images/1000ya.png",
      title: "1000sen team Restart",
      position: "再始動プロジェクト",
      date: "2025年5月〜",
      year: '2025',
      month: '05',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-12-31'), // 仮の終了日
      color: '#FF6B6B',
      highlight: 'Latest Project',
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
      links: [
        { text: t('experience4Link1'), url: 'https://edist.ne.jp/list/81kanmon_51shu_names/' },
        { text: t('experience4Link2'), url: 'https://edist.ne.jp/list/82kanmon_51shu_book/' },
        { text: t('experience4Link3'), url: 'https://edist.ne.jp/post/51syu_ruijisoji/' }
      ]
    }
  ]



  // Extract all years that appear in any project timeline (oldest first for left-to-right timeline)
  const allYears = new Set<string>()
  experiences.forEach(exp => {
    const startYear = exp.startDate.getFullYear()
    const endYear = exp.endDate.getFullYear()
    for (let year = startYear; year <= endYear; year++) {
      allYears.add(year.toString())
    }
  })
  const years = Array.from(allYears).sort()

  const timelineData = years.map(year => {
    const yearNumber = parseInt(year)
    const yearExperiences = experiences.filter(exp => {
      const startYear = exp.startDate.getFullYear()
      const endYear = exp.endDate.getFullYear()
      return yearNumber >= startYear && yearNumber <= endYear
    })

    const monthsInYear: number[] = []
    yearExperiences.forEach(exp => {
      const startYear = exp.startDate.getFullYear()
      const endYear = exp.endDate.getFullYear()

      if (yearNumber === startYear && yearNumber === endYear) {
        // Same year project
        monthsInYear.push(exp.startDate.getMonth() + 1, exp.endDate.getMonth() + 1)
      } else if (yearNumber === startYear) {
        // Start year of multi-year project
        monthsInYear.push(exp.startDate.getMonth() + 1, 12)
      } else if (yearNumber === endYear) {
        // End year of multi-year project
        monthsInYear.push(1, exp.endDate.getMonth() + 1)
      } else {
        // Middle year of multi-year project
        monthsInYear.push(1, 12)
      }
    })

    return {
      year,
      startMonth: monthsInYear.length > 0 ? Math.min(...monthsInYear) : 1,
      endMonth: monthsInYear.length > 0 ? Math.max(...monthsInYear) : 12,
      projectCount: yearExperiences.length
    }
  })

  // Scroll to top function
  const scrollToLatest = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-b from-gray-900 via-gray-900/50 to-gray-900'
            : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
        }`} />
      </div>

      <div className="w-full px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Clock className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
            <h2 className={`text-4xl md:text-5xl font-light tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('experience')}
            </h2>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
          </div>

          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto font-light`}>
            Professional project timeline with overlapping periods and achievements
          </p>
        </motion.div>

        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-8"
        >
          {years.map((year) => (
            <motion.button
              key={year}
              onClick={() => setSelectedYear(selectedYear === year ? null : year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedYear === year
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : isDark
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                    : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {year}
            </motion.button>
          ))}
          {selectedYear && (
            <motion.button
              onClick={() => setSelectedYear(null)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                isDark ? 'bg-red-900/50 text-red-300 hover:bg-red-800/50' : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          )}
        </motion.div>

                        {/* Professional Gantt Chart */}
        <div className="relative" ref={timelineRef}>
          {/* Clean Container Background */}
          <div className={`rounded-2xl border ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white/80 border-gray-200'} backdrop-blur-sm shadow-xl`} />

                    {/* Timeline Header */}
          <div className="p-4 md:p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                ref={topRef}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Project Timeline
                </span>
              </motion.div>

              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {experiences.length} total projects
              </div>
            </div>

                                    {/* Year Scale with Activity Indicators */}
            <div className="relative">
              <div className="flex justify-between items-center">
                {timelineData.map((data, index) => (
                  <motion.div
                    key={data.year}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-3 h-3 rounded-full mb-3 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} shadow-md`} />
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {data.year}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} px-2 py-1 rounded-full ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                      活動期間
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                      {data.projectCount} project{data.projectCount > 1 ? 's' : ''}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Timeline base line */}
              <div className={`absolute top-3 left-0 right-0 h-0.5 ${isDark ? 'bg-gradient-to-r from-blue-900/50 via-blue-600/30 to-blue-900/50' : 'bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200'} rounded-full`} />
            </div>
          </div>

          {/* Gantt Chart Body */}
          <div className="p-4 md:p-6 space-y-6">
                        {experiences.map((experience, index) => {
              const isFiltered = selectedYear && !years.includes(selectedYear) ? false :
                                selectedYear && !(experience.startDate.getFullYear() <= parseInt(selectedYear) &&
                                                 experience.endDate.getFullYear() >= parseInt(selectedYear))

              // Calculate position and width based on months for precise timeline
              const minDate = new Date(Math.min(...experiences.map(exp => exp.startDate.getTime())))
              const maxDate = new Date(Math.max(...experiences.map(exp => exp.endDate.getTime())))

              // Calculate total months in timeline
              const timelineMinYear = minDate.getFullYear()
              const timelineMinMonth = minDate.getMonth()
              const timelineMaxYear = maxDate.getFullYear()
              const timelineMaxMonth = maxDate.getMonth()
              const totalMonths = (timelineMaxYear - timelineMinYear) * 12 + (timelineMaxMonth - timelineMinMonth) + 1

              // Calculate project start and duration in months
              const projectStartYear = experience.startDate.getFullYear()
              const projectStartMonth = experience.startDate.getMonth()
              const projectEndYear = experience.endDate.getFullYear()
              const projectEndMonth = experience.endDate.getMonth()

              const startMonthIndex = (projectStartYear - timelineMinYear) * 12 + (projectStartMonth - timelineMinMonth)
              const endMonthIndex = (projectEndYear - timelineMinYear) * 12 + (projectEndMonth - timelineMinMonth)
              const durationInMonths = endMonthIndex - startMonthIndex + 1

              // Convert to percentages with padding
              const availableWidth = 85 // 85% of container width
              const leftPadding = 7.5 // 7.5% left padding
              const startPosition = (startMonthIndex / totalMonths) * availableWidth + leftPadding
              const duration = (durationInMonths / totalMonths) * availableWidth

              return (
                <motion.div
                  key={experience.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: isFiltered ? 0.3 : 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Project Info */}
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden shadow-md border-2 border-white dark:border-gray-800"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <Image
                        src={experience.logo}
                        alt={experience.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {experience.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {experience.position}
                      </p>
                    </div>

                    {experience.highlight && (
                      <motion.div
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg flex items-center gap-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap className="w-3 h-3" />
                        {experience.highlight}
                      </motion.div>
                    )}
                  </div>

                  {/* Timeline Bar Container */}
                  <div className="relative h-12">
                    {/* Background Track */}
                    <div className={`absolute inset-0 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`} />

                    {/* Progress Bar */}
                    <motion.div
                      className="absolute top-1 bottom-1 rounded-lg shadow-lg cursor-pointer group"
                      style={{
                        left: `${startPosition}%`,
                        width: `${duration}%`,
                        backgroundColor: experience.color,
                        background: `linear-gradient(135deg, ${experience.color}, ${experience.color}dd)`
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${duration}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      whileHover={{
                        scale: 1.02,
                        filter: 'brightness(1.1)'
                      }}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      {/* Progress bar content */}
                      <div className="relative h-full flex items-center justify-between px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-white/90 rounded-full" />
                          <span className="text-white text-xs font-medium">
                            {projectStartYear}
                          </span>
                        </div>

                        <span className="text-white text-xs font-medium">
                          {projectEndYear}
                        </span>
                      </div>

                      {/* Hover tooltip */}
                      <motion.div
                        className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                        } shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {experience.date}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                          isDark ? 'border-t-gray-800' : 'border-t-white'
                        }`} />
                      </motion.div>
                    </motion.div>

                    {/* Duration indicator */}
                    <motion.div
                      className={`absolute -right-16 top-1/2 -translate-y-1/2 text-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeIndex === index ? 1 : 0.7 }}
                    >
                      {durationInMonths} mo
                    </motion.div>
                  </div>

                  {/* Expanded Details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-3">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {experience.date}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {experience.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                            style={{
                              backgroundColor: `${experience.color}20`,
                              color: experience.color,
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: `${experience.color}30`,
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: linkIndex * 0.05 }}
                          >
                            {link.text}
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} flex items-center gap-2`}>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              Click timeline bars to view project details
            </div>

            <motion.button
              onClick={scrollToLatest}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ↑ Go to Top
            </motion.button>
          </div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className={`inline-block px-4 py-2 rounded-full ${
              isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100/50 text-gray-600'
            } text-sm`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore the journey
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

