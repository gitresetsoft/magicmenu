
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
  
  const difficultyInfo = difficultyLabels[difficulty];
  const isIndonesian = recipe.source === 'indonesian';

  // Dummy video thumbnails
  const videoThumbnails = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556909044-f6e7ad7d3136?w=300&h=200&fit=crop', 
    'https://images.unsplash.com/photo-1556908153-41b2c92b49f5?w=300&h=200&fit=crop'
  ];

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

          {/* Collapsible Ingredients Section */}
          <div className="recipe-section">
            <button 
              className="collapsible-header"
              onClick={() => setIsIngredientsExpanded(!isIngredientsExpanded)}
            >
              <h3 className="section-title">🛒 Bahan-bahan</h3>
              {isIngredientsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isIngredientsExpanded && (
              <div className="collapsible-content">
                <div className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      • {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Collapsible Instructions Section */}
          <div className="recipe-section">
            <button 
              className="collapsible-header"
              onClick={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
            >
              <h3 className="section-title">👨‍🍳 Cara Masak</h3>
              {isInstructionsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {isInstructionsExpanded && (
              <div className="collapsible-content">
                <div className="instructions-text">
                  {recipe.instructions}
                </div>
              </div>
            )}
          </div>

          {/* Video Tutorial Section */}
          <div className="recipe-section">
            <h3 className="section-title">📺 Video Tutorial</h3>
            <div className="video-thumbnails">
              {videoThumbnails.map((thumbnail, index) => (
                <div key={index} className="video-thumbnail">
                  <img src={thumbnail} alt={`Tutorial ${index + 1}`} />
                  <div className="play-button">▶️</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
