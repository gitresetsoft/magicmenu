
export const LoadingSkeleton = () => {
  return (
    <div className="recipe-card loading-skeleton">
      {/* Background skeleton */}
      <div className="skeleton-background animate-pulse" />
      
      {/* Content skeleton */}
      <div className="recipe-content-container">
        <div className="recipe-content">
          <div className="recipe-title-section">
            <div className="skeleton-line skeleton-title animate-pulse" />
            <div className="skeleton-line skeleton-meta animate-pulse" />
          </div>
          
          <div className="recipe-details">
            <div className="skeleton-line skeleton-section animate-pulse" />
            <div className="skeleton-line skeleton-text animate-pulse" />
            <div className="skeleton-line skeleton-text animate-pulse" />
            <div className="skeleton-line skeleton-text animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Floating buttons skeleton */}
      <div className="floating-buttons">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-btn animate-pulse" />
        ))}
      </div>
    </div>
  );
};
