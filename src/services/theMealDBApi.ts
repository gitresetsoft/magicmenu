
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const theMealDBApi = {
  async getRandomRecipe() {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals[0];
  },

  async getRecipeById(id: string) {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals[0];
  },

  async searchRecipes(query: string) {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.meals || [];
  }
};
