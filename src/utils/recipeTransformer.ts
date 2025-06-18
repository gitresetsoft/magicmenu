
export const transformIndonesianRecipe = (recipeData: any) => {
  return {
    id: recipeData.key || recipeData.title?.replace(/\s+/g, '-').toLowerCase(),
    name: recipeData.title,
    image: recipeData.thumb,
    category: 'Indonesian',
    area: 'Indonesia',
    originalIngredients: recipeData.ingredient?.split(',').map((ing: string) => ing.trim()) || [],
    originalInstructions: recipeData.step || '',
    videoUrl: null,
    source: 'indonesian'
  };
};

export const transformMalaysianRecipe = (mealData: any) => {
  // Extract ingredients from TheMealDB format
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      const ingredientText = measure?.trim() 
        ? `${measure.trim()} ${ingredient.trim()}`
        : ingredient.trim();
      ingredients.push(ingredientText);
    }
  }

  return {
    id: mealData.idMeal,
    name: mealData.strMeal,
    image: mealData.strMealThumb,
    category: mealData.strCategory,
    area: mealData.strArea || 'Malaysian',
    originalIngredients: ingredients,
    originalInstructions: mealData.strInstructions,
    videoUrl: mealData.strYoutube,
    source: 'malaysian'
  };
};

export const transformRecipe = (recipeData: any, source: 'indonesian' | 'malaysian') => {
  if (source === 'indonesian') {
    return transformIndonesianRecipe(recipeData);
  } else {
    return transformMalaysianRecipe(recipeData);
  }
};
