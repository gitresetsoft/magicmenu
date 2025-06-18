
import { useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  currentIndex: number;
  totalRecipes: number;
  onIndexChange: (newIndex: number) => void;
}

export const useInfiniteScroll = ({ 
  currentIndex, 
  totalRecipes, 
  onIndexChange 
}: UseInfiniteScrollProps) => {
  const touchStartY = useRef<number>(0);
  const scrollThreshold = 50;

  const handleScroll = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const deltaY = e.deltaY;
    
    if (Math.abs(deltaY) > scrollThreshold) {
      if (deltaY > 0 && currentIndex < totalRecipes - 1) {
        // Scroll down - next recipe
        onIndexChange(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Scroll up - previous recipe
        onIndexChange(currentIndex - 1);
      }
    }
  }, [currentIndex, totalRecipes, onIndexChange]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    
    if (Math.abs(deltaY) > scrollThreshold) {
      if (deltaY > 0 && currentIndex < totalRecipes - 1) {
        // Swipe up - next recipe
        onIndexChange(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Swipe down - previous recipe
        onIndexChange(currentIndex - 1);
      }
    }
  }, [currentIndex, totalRecipes, onIndexChange]);

  return {
    handleScroll,
    handleTouchStart,
    handleTouchEnd
  };
};
