import React from 'react';
import MealList from '../Meal/MealList';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite recipes yet.</p>
      ) : (
        <MealList meals={favorites} />
      )}
    </div>
  );
};

export default Favorites;
