import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface CurrentTimeIndicatorProps {
  position: number
  isDark: boolean
}

export function CurrentTimeIndicator({ position, isDark }: CurrentTimeIndicatorProps) {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('ja-JP', { month: 'short' })
  const currentYear = currentDate.getFullYear()

  return (
    <motion.div
      className="absolute top-0 bottom-0 z-30 pointer-events-none"
      style={{ left: `${position}%` }}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
    >
      {/* 垂直線 - 強化版 */}
      <div className="absolute top-4 bottom-4 w-0.5 bg-gradient-to-b from-red-400 via-red-500 to-red-600 shadow-lg opacity-90"
           style={{ left: '-1px' }} />

      {/* グロー効果 */}
      <div className="absolute top-4 bottom-4 w-1 bg-red-500/30 blur-sm"
           style={{ left: '-2px' }} />

      {/* 上部の現在時刻表示 - 改良版 */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-xl border ${
            isDark
              ? 'bg-red-900/95 text-red-100 border-red-700/60 backdrop-blur-md'
              : 'bg-red-50/95 text-red-900 border-red-300/60 backdrop-blur-md'
          }`}
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2, ease: "backOut" }}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <div className="text-center">
              <div className="font-bold text-xs">現在</div>
              <div className="opacity-90 text-xs">{currentYear}年{currentMonth}</div>
            </div>
          </div>
          {/* 下向き三角 - 改良版 */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent ${
            isDark ? 'border-t-red-900/95' : 'border-t-red-50/95'
          }`} />
        </motion.div>
      </div>

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

      {/* パルスエフェクト */}
      <motion.div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500/40 rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}