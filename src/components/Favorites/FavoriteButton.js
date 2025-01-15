import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FavoriteButton = ({ meal }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(meal);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <AiFillHeart className="text-red-500" size={24} />
      ) : (
        <AiOutlineHeart size={24} />
      )}
    </button>
  );
};

export default FavoriteButton;
