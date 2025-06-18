
import { useMemo } from "react";

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

export const useDifficultyTransform = (recipe: Recipe, difficulty: 'malas' | 'biasa' | 'power') => {
  return useMemo(() => {
    const baseRecipe = {
      name: recipe.name,
      category: recipe.category,
      area: recipe.area,
    };

    switch (difficulty) {
      case 'malas':
        return {
          ...baseRecipe,
          ingredients: recipe.originalIngredients.slice(0, Math.min(5, recipe.originalIngredients.length)),
          instructions: simplifyInstructions(recipe.originalInstructions),
          cookTime: "15-20 mins",
        };
      
      case 'power':
        return {
          ...baseRecipe,
          ingredients: enhanceIngredients(recipe.originalIngredients),
          instructions: enhanceInstructions(recipe.originalInstructions),
          cookTime: "45-60 mins",
        };
      
      default: // biasa
        return {
          ...baseRecipe,
          ingredients: recipe.originalIngredients,
          instructions: recipe.originalInstructions,
          cookTime: "30-40 mins",
        };
    }
  }, [recipe, difficulty]);
};

const simplifyInstructions = (original: string): string => {
  const sentences = original.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const simplified = sentences.slice(0, 3).map((sentence, index) => {
    const step = index + 1;
    const cleanSentence = sentence.trim().replace(/^Step \d+:?\s*/i, '');
    return `${step}. ${cleanSentence}.`;
  });
  
  return simplified.join(' ');
};

const enhanceInstructions = (original: string): string => {
  const enhanced = original + " For best results, let the dish rest for 5 minutes before serving. Garnish with fresh herbs and serve with a side of your choice.";
  return enhanced;
};

const enhanceIngredients = (ingredients: string[]): string[] => {
  const premiumAdditions = [
    "Fresh herbs (basil, parsley, or thyme)",
    "High-quality olive oil",
    "Freshly ground black pepper",
    "Sea salt flakes",
  ];
  
  return [...ingredients, ...premiumAdditions.slice(0, 2)];
};
