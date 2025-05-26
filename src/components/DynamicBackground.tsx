'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { MousePosition } from '../types'

// 背景の粒子数を削減（15から8へ）
const PARTICLE_COUNT = 8;

export function DynamicBackground() {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastExecTime = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime.current > 50) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      lastExecTime.current = currentTime;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDark ? 'bg-gradient-to-r from-blue-400/20 to-blue-600/20' : 'bg-gradient-to-r from-blue-300/20 to-blue-500/20'} rounded-full`}
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: 'transform, opacity', // パフォーマンス最適化
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Effect with reduced size */}
      <motion.div
        className={`absolute w-64 h-64 ${isDark ? 'bg-gradient-to-r from-blue-400/3 to-blue-600/3' : 'bg-gradient-to-r from-blue-300/8 to-blue-500/8'} rounded-full blur-3xl`}
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 50 }}
        style={{
          willChange: 'transform', // パフォーマンス最適化
        }}
      />
    </div>
  );
}