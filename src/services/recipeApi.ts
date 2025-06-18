
const MASAK_APA_BASE_URL = 'https://masak-apa.tomorisakura.vercel.app';
const THEMEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeApi = {
  // Indonesian recipes from MasakApaHariIni
  async getIndonesianRecipes(count = 2) {
    try {
      const response = await fetch(`${MASAK_APA_BASE_URL}/api/recipes`);
      const data = await response.json();
      
      // Take random recipes from the results
      const shuffled = data.results?.sort(() => 0.5 - Math.random()) || [];
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Error fetching Indonesian recipes:', error);
      return [];
    }
  },

  async getIndonesianRecipeDetail(key: string) {
    try {
      const response = await fetch(`${MASAK_APA_BASE_URL}/api/recipe/${key}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching Indonesian recipe detail:', error);
      return null;
    }
  },

  async searchIndonesianRecipes(query: string) {
    try {
      const response = await fetch(`${MASAK_APA_BASE_URL}/api/search/?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching Indonesian recipes:', error);
      return [];
    }
  },

  // Malaysian/Asian recipes from TheMealDB
  async getMalaysianRecipes(count = 2) {
    try {
      const recipePromises = Array(count).fill(null).map(async () => {
        // Try to get Malaysian recipes, fallback to random Asian recipes
        try {
          const malaysianResponse = await fetch(`${THEMEALDB_BASE_URL}/filter.php?a=Malaysian`);
          const malaysianData = await malaysianResponse.json();
          
          if (malaysianData.meals && malaysianData.meals.length > 0) {
            const randomMeal = malaysianData.meals[Math.floor(Math.random() * malaysianData.meals.length)];
            const detailResponse = await fetch(`${THEMEALDB_BASE_URL}/lookup.php?i=${randomMeal.idMeal}`);
            const detailData = await detailResponse.json();
            return detailData.meals[0];
          }
        } catch (error) {
          console.log('Malaysian recipes not available, using random recipe');
        }
        
        // Fallback to random recipe
        const response = await fetch(`${THEMEALDB_BASE_URL}/random.php`);
        const data = await response.json();
        return data.meals[0];
      });
      
      const results = await Promise.all(recipePromises);
      return results.filter(recipe => recipe !== null);
    } catch (error) {
      console.error('Error fetching Malaysian recipes:', error);
      return [];
    }
  },

  async getRecipeById(id: string) {
    try {
      const response = await fetch(`${THEMEALDB_BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      return null;
    }
  },

  async searchMalaysianRecipes(query: string) {
    try {
      const response = await fetch(`${THEMEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching Malaysian recipes:', error);
      return [];
    }
  }
};
