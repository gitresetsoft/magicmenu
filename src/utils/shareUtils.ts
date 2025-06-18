
interface Recipe {
  id: string;
  name: string;
}

export const shareRecipe = async (recipe: Recipe) => {
  const shareUrl = `https://example.com/recipe/${recipe.id}`;
  const shareText = `Check out this amazing recipe: ${recipe.name}`;
  
  // Check if native sharing is available (mobile devices)
  if (navigator.share) {
    try {
      await navigator.share({
        title: recipe.name,
        text: shareText,
        url: shareUrl,
      });
      console.log('Recipe shared successfully');
    } catch (error) {
      console.log('Error sharing recipe:', error);
      // Fallback to clipboard
      fallbackShare(shareUrl, shareText);
    }
  } else {
    // Fallback for devices without native sharing
    fallbackShare(shareUrl, shareText);
  }
};

const fallbackShare = (url: string, text: string) => {
  const shareData = `${text}\n${url}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData).then(() => {
      // Show a toast or notification that link was copied
      console.log('Recipe link copied to clipboard');
    }).catch(() => {
      // Last fallback - create a shareable link
      console.log('Opening share URL');
      window.open(`mailto:?subject=Amazing Recipe&body=${encodeURIComponent(shareData)}`);
    });
  } else {
    // Very last fallback for older browsers
    window.open(`mailto:?subject=Amazing Recipe&body=${encodeURIComponent(shareData)}`);
  }
};
