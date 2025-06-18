
interface RecipeContentProps {
  recipe: {
    name: string;
    ingredients: string[];
    instructions: string;
    cookTime: string;
    category: string;
    area: string;
    source?: 'indonesian' | 'malaysian';
  };
  isChanging: boolean;
  difficulty: 'malas' | 'biasa' | 'power';
}

const difficultyLabels = {
  malas: { emoji: '😴', label: 'Easy Mode' },
  biasa: { emoji: '😊', label: 'Normal' },
  power: { emoji: '💪', label: 'Chef Mode' }
};

export const RecipeContent = ({ recipe, isChanging, difficulty }: RecipeContentProps) => {
  const difficultyInfo = difficultyLabels[difficulty];
  const isIndonesian = recipe.source === 'indonesian';

  return (
    <div className="recipe-content-container">
      <div className={`recipe-content ${isChanging ? 'content-changing' : ''}`}>
        {/* Recipe Title - TikTok Username Style */}
        <div className="recipe-title-section">
          <h1 className="recipe-name">{recipe.name}</h1>
          <div className="recipe-meta">
            <span className="difficulty-indicator">
              <span className="difficulty-emoji">{difficultyInfo.emoji}</span>
              <span className="difficulty-label">{difficultyInfo.label}</span>
            </span>
            <span className="recipe-origin">
              {recipe.area} • {recipe.category}
              {isIndonesian && <span className="ml-1">🇮🇩</span>}
              {recipe.source === 'malaysian' && <span className="ml-1">🇲🇾</span>}
            </span>
          </div>
        </div>

        {/* Recipe Details - TikTok Description Style */}
        <div className="recipe-details">
          <div className="recipe-section">
            <h3 className="section-title">⏱️ Cook Time: {recipe.cookTime}</h3>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">🛒 Bahan-bahan</h3>
            <div className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  • {ingredient}
                </div>
              ))}
            </div>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">👨‍🍳 Cara Masak</h3>
            <div className="instructions-text">
              {recipe.instructions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
