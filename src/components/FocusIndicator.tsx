'use client'

import { useEffect } from 'react'

export function FocusIndicator() {
  useEffect(() => {
    // キーボードナビゲーション時のみフォーカスリングを表示
    const handleMouseDown = () => {
      document.body.classList.add('using-mouse');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}