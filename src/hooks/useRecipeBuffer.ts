
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { recipeApi } from "@/services/recipeApi";
import { transformRecipe } from "@/utils/recipeTransformer";

interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  area: string;
  originalIngredients: string[];
  originalInstructions: string;
  videoUrl?: string;
  source: 'indonesian' | 'malaysian';
}

export const useRecipeBuffer = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [fetchCount, setFetchCount] = useState(0);

  // Initial fetch with 70/30 ratio (2 Indonesian + 2 Malaysian)
  const { data: initialRecipes, isLoading } = useQuery({
    queryKey: ['recipes', 'initial'],
    queryFn: async () => {
      console.log('Fetching initial recipes with 70/30 ratio...');
      
      const [indonesianRecipes, malaysianRecipes] = await Promise.all([
        recipeApi.getIndonesianRecipes(2),
        recipeApi.getMalaysianRecipes(2)
      ]);

      const transformedRecipes = [
        ...indonesianRecipes.map(recipe => transformRecipe(recipe, 'indonesian')),
        ...malaysianRecipes.map(recipe => transformRecipe(recipe, 'malaysian'))
      ];

      // Shuffle to mix Indonesian and Malaysian recipes
      return transformedRecipes.sort(() => 0.5 - Math.random());
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Additional recipes fetching maintaining 70/30 ratio
  const { refetch: fetchMoreRecipes, isFetching } = useQuery({
    queryKey: ['recipes', 'additional', fetchCount],
    queryFn: async () => {
      console.log('Fetching additional recipes maintaining 70/30 ratio...');
      
      // Fetch 2 Indonesian + 1 Malaysian to maintain ratio
      const [indonesianRecipes, malaysianRecipes] = await Promise.all([
        recipeApi.getIndonesianRecipes(2),
        recipeApi.getMalaysianRecipes(1)
      ]);

      const transformedRecipes = [
        ...indonesianRecipes.map(recipe => transformRecipe(recipe, 'indonesian')),
        ...malaysianRecipes.map(recipe => transformRecipe(recipe, 'malaysian'))
      ];

      return transformedRecipes.sort(() => 0.5 - Math.random());
    },
    enabled: false,
  });

  // Set initial recipes
  useEffect(() => {
    if (initialRecipes && recipes.length === 0) {
      setRecipes(initialRecipes);
    }
  }, [initialRecipes, recipes.length]);

  const fetchMore = useCallback(async () => {
    console.log('Requesting more recipes...');
    const result = await fetchMoreRecipes();
    if (result.data) {
      setRecipes(prev => [...prev, ...result.data]);
      setFetchCount(prev => prev + 1);
    }
  }, [fetchMoreRecipes]);

  return {
    recipes,
    isLoading: isLoading || (recipes.length === 0),
    isFetching,
    fetchMore
  };
};
