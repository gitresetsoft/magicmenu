import { useState } from "react";
import { FloatingButtons } from "./FloatingButtons";
import { RecipeContent } from "./RecipeContent";
import { useDifficultyTransform } from "@/hooks/useDifficultyTransform";
import { shareRecipe } from "@/utils/shareUtils";

interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  area: string;
  originalIngredients: string[];
  originalInstructions: string;
  videoUrl?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  isTransitioning: boolean;
}

export const RecipeCard = ({ recipe, isTransitioning }: RecipeCardProps) => {
  const [difficulty, setDifficulty] = useState<'malas' | 'biasa' | 'power'>('biasa');
  const [isLoved, setIsLoved] = useState(false);
  const [isChangingDifficulty, setIsChangingDifficulty] = useState(false);
  
  const transformedRecipe = useDifficultyTransform(recipe, difficulty);

  const handleDifficultyChange = async (newDifficulty: 'malas' | 'biasa' | 'power') => {
    if (newDifficulty === difficulty) return;
    
    setIsChangingDifficulty(true);
    
    // Smooth transition with stagger
    setTimeout(() => {
      setDifficulty(newDifficulty);
      setTimeout(() => setIsChangingDifficulty(false), 100);
    }, 200);
  };

  const handleShare = () => {
    shareRecipe({
      id: recipe.id,
      name: recipe.name
    });
  };

  return (
    <div className={`recipe-card ${isTransitioning ? 'card-transitioning' : ''}`}>
      {/* Background Image */}
      <div 
        className="recipe-background"
        style={{ backgroundImage: `url(${recipe.image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="recipe-gradient" />
      
      {/* Recipe Content */}
      <RecipeContent 
        recipe={transformedRecipe}
        isChanging={isChangingDifficulty}
        difficulty={difficulty}
      />
      
      {/* Floating Action Buttons */}
      <FloatingButtons
        isLoved={isLoved}
        onLoveToggle={() => setIsLoved(!isLoved)}
        currentDifficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onShare={handleShare}
      />
    </div>
  );
};
