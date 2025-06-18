
export const transformRecipe = (mealData: any) => {
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
    area: mealData.strArea,
    originalIngredients: ingredients,
    originalInstructions: mealData.strInstructions,
    videoUrl: mealData.strYoutube,
  };
};
