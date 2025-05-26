import { useCallback, useRef } from 'react';

export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastExecTime = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime.current >= delay) {
        callback(...args);
        lastExecTime.current = currentTime;
      } else {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        
        timeoutId.current = setTimeout(() => {
          callback(...args);
          lastExecTime.current = Date.now();
        }, delay - (currentTime - lastExecTime.current));
      }
    },
    [callback, delay]
  ) as T;

  return throttledCallback;
}