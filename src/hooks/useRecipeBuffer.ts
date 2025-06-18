
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { theMealDBApi } from "@/services/theMealDBApi";
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
}

export const useRecipeBuffer = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [fetchCount, setFetchCount] = useState(0);

  // Initial fetch of recipes
  const { data: initialRecipes, isLoading } = useQuery({
    queryKey: ['recipes', 'initial'],
    queryFn: async () => {
      console.log('Fetching initial recipes...');
      const recipePromises = Array(4).fill(null).map(() => theMealDBApi.getRandomRecipe());
      const results = await Promise.all(recipePromises);
      return results.map(transformRecipe);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Additional recipes fetching
  const { refetch: fetchMoreRecipes, isFetching } = useQuery({
    queryKey: ['recipes', 'additional', fetchCount],
    queryFn: async () => {
      console.log('Fetching additional recipes...');
      const recipePromises = Array(3).fill(null).map(() => theMealDBApi.getRandomRecipe());
      const results = await Promise.all(recipePromises);
      return results.map(transformRecipe);
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
