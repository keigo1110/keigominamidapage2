import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { calculateCurrentTimePosition } from '../../../utils/experienceProcessor'

interface CurrentTimeIndicatorProps {
  timelineBounds: {
    startDate: Date
    endDate: Date
  }
  isDark: boolean
  experiences?: Array<{
    startDate: Date
    endDate: Date
    status: string
  }>
}

export function CurrentTimeIndicator({
  timelineBounds,
  isDark,
  experiences = []
}: CurrentTimeIndicatorProps) {
  // 現在時刻の自動更新のためのstate
  const [currentTime, setCurrentTime] = useState(new Date())

  // 1時間ごとに現在時刻を更新
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date())
    }

    // 初回設定
    updateCurrentTime()

    // 1時間ごとに更新（3600000ms = 1時間）
    const interval = setInterval(updateCurrentTime, 3600000)

    // また、次の日の0時に更新されるようにタイマーも設定
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime()
    const dailyTimeout = setTimeout(() => {
      updateCurrentTime()
      // 翌日以降は24時間ごとに更新
      const dailyInterval = setInterval(updateCurrentTime, 24 * 60 * 60 * 1000)
      return () => clearInterval(dailyInterval)
    }, timeUntilTomorrow)

    return () => {
      clearInterval(interval)
      clearTimeout(dailyTimeout)
    }
  }, [])

  // 現在位置と進行中プロジェクトの計算
  const currentTimeData = useMemo(() => {
    const currentDayStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0, 0)

        // 既存の統一された位置計算関数を使用
    const position = calculateCurrentTimePosition(timelineBounds)

    // 進行中プロジェクトの検出
    const ongoingExperiences = experiences.filter(exp =>
      exp.startDate <= currentDayStart && exp.endDate >= currentDayStart
    )

    return {
      position,
      activeProjectsCount: ongoingExperiences.length,
      currentYear: currentTime.getFullYear(),
      currentMonth: currentTime.getMonth() + 1,
      currentDay: currentTime.getDate(),
      hasOngoingProjects: ongoingExperiences.length > 0
    }
  }, [currentTime, timelineBounds, experiences])

    // プロジェクト情報の幅分を考慮した位置調整
  // w-32 sm:w-40 lg:w-56 + pr-2 sm:pr-4 の分だけオフセット
  const projectInfoWidthPercent = 25 // 概算値（左側のプロジェクト情報領域）
  const adjustedPosition = projectInfoWidthPercent + (currentTimeData.position * (100 - projectInfoWidthPercent) / 100)

  return (
    <motion.div
      className="absolute top-0 bottom-0 z-40 pointer-events-none"
      style={{ left: `${adjustedPosition}%` }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: 1,
        scaleY: 1
      }}
      transition={{
        duration: 0.6,
        delay: 0.8,
        ease: "easeOut"
      }}
    >
      {/* 現在時刻ラベル */}
      <motion.div
        className={`absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg ${
          isDark ? 'bg-red-900/90 border-red-700/50' : 'bg-red-50/90 border-red-200/50'
        } border backdrop-blur-sm shadow-lg min-w-max`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <div className="flex items-center gap-2 text-xs">
          <Calendar className={`w-3 h-3 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
          <span className={`font-medium ${isDark ? 'text-red-200' : 'text-red-800'}`}>
            {currentTimeData.currentYear}/{String(currentTimeData.currentMonth).padStart(2, '0')}/{String(currentTimeData.currentDay).padStart(2, '0')}
          </span>
        </div>
        {currentTimeData.hasOngoingProjects && (
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-red-400' : 'bg-red-600'}`} />
            <span className={`text-xs ${isDark ? 'text-red-300' : 'text-red-700'}`}>
              {currentTimeData.activeProjectsCount}件進行中
            </span>
          </div>
        )}
      </motion.div>

      {/* 垂直線 */}
      <div className="absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-red-400 via-red-500 to-red-600 shadow-lg opacity-90"
           style={{ left: '-1px' }} />

      {/* グロー効果 */}
      <div className="absolute top-4 bottom-4 w-1 bg-red-500/30 blur-sm"
           style={{ left: '-2px' }} />

      {/* 上部のドット */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-lg border-2 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
      />

      {/* 下部のドット */}
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full shadow-lg border-2 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.0 }}
      />

      {/* パルスエフェクト - より目立つように */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500/40 rounded-full"
        animate={{
          scale: currentTimeData.hasOngoingProjects ? [1, 2.5, 1] : [1, 2, 1],
          opacity: currentTimeData.hasOngoingProjects ? [0.6, 0, 0.6] : [0.4, 0, 0.4]
        }}
        transition={{
          duration: currentTimeData.hasOngoingProjects ? 1.5 : 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 進行中プロジェクトがある場合の追加エフェクト */}
      {currentTimeData.hasOngoingProjects && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500/40 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      )}
    </motion.div>
  )
}