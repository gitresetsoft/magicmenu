
import { useState, useEffect, useRef } from "react";
import { RecipeCard } from "./RecipeCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useRecipeBuffer } from "@/hooks/useRecipeBuffer";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export const RecipeApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { recipes, isLoading, fetchMore } = useRecipeBuffer();
  
  const { handleScroll, handleTouchStart, handleTouchEnd } = useInfiniteScroll({
    currentIndex,
    totalRecipes: recipes.length,
    onIndexChange: (newIndex) => {
      if (isTransitioning) return;
      
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      
      // Fetch more recipes when approaching the end
      if (newIndex >= recipes.length - 2) {
        fetchMore();
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
    }
  });

  if (isLoading && recipes.length === 0) {
    return <LoadingSkeleton />;
  }

  const currentRecipe = recipes[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="recipe-app-container"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {currentRecipe && (
        <RecipeCard 
          recipe={currentRecipe} 
          isTransitioning={isTransitioning}
        />
      )}
      
      {/* Loading overlay for next recipes */}
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Loading more recipes...
          </div>
        </div>
      )}
    </div>
  );
};
