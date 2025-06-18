
import { Heart, Share } from "lucide-react";

interface FloatingButtonsProps {
  isLoved: boolean;
  onLoveToggle: () => void;
  currentDifficulty: 'malas' | 'biasa' | 'power';
  onDifficultyChange: (difficulty: 'malas' | 'biasa' | 'power') => void;
  onShare: () => void;
}

export const FloatingButtons = ({ 
  isLoved, 
  onLoveToggle, 
  currentDifficulty, 
  onDifficultyChange,
  onShare
}: FloatingButtonsProps) => {
  const difficulties = [
    { key: 'malas' as const, emoji: '😴', label: 'Easy' },
    { key: 'biasa' as const, emoji: '😊', label: 'Normal' },
    { key: 'power' as const, emoji: '💪', label: 'Hard' }
  ];

  return (
    <div className="floating-buttons">
      {/* Love Button */}
      <button 
        className={`floating-btn love-btn ${isLoved ? 'love-active' : ''}`}
        onClick={onLoveToggle}
      >
        <Heart 
          size={24} 
          fill={isLoved ? 'currentColor' : 'none'} 
        />
        <span className="btn-label">Love</span>
      </button>

      {/* Difficulty Buttons */}
      {difficulties.map(({ key, emoji, label }) => (
        <button
          key={key}
          className={`floating-btn difficulty-btn ${
            currentDifficulty === key ? 'difficulty-active' : ''
          }`}
          onClick={() => onDifficultyChange(key)}
        >
          <span className="difficulty-emoji">{emoji}</span>
          <span className="btn-label">{label}</span>
        </button>
      ))}

      {/* Share Button */}
      <button 
        className="floating-btn share-btn"
        onClick={onShare}
      >
        <Share size={24} />
        <span className="btn-label">Share</span>
      </button>
    </div>
  );
};
