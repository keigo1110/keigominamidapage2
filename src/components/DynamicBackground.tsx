'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { MousePosition } from '../types'

// 固定された粒子位置でHydrationエラーを防ぐ
const PARTICLE_POSITIONS = [
  { x: 15, y: 25 },
  { x: 35, y: 60 },
  { x: 70, y: 15 },
  { x: 85, y: 45 },
  { x: 25, y: 80 },
  { x: 60, y: 75 },
  { x: 45, y: 30 },
  { x: 90, y: 70 }
];

export function DynamicBackground() {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const lastExecTime = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0">
          {PARTICLE_POSITIONS.map((position, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${isDark ? 'bg-gradient-to-r from-blue-400/20 to-blue-600/20' : 'bg-gradient-to-r from-blue-300/20 to-blue-500/20'} rounded-full`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {PARTICLE_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${isDark ? 'bg-gradient-to-r from-blue-400/20 to-blue-600/20' : 'bg-gradient-to-r from-blue-300/20 to-blue-500/20'} rounded-full`}
            animate={{
              x: [0, (i % 2 === 0 ? 50 : -50) + Math.sin(i) * 30, 0],
              y: [0, (i % 3 === 0 ? 40 : -40) + Math.cos(i) * 25, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 20 + (i * 2.5),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              willChange: 'transform, opacity',
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