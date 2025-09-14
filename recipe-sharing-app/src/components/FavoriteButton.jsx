import { useRecipeStore } from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const isFav = favorites.includes(recipeId);

  return (
    <button
      onClick={() => (isFav ? removeFavorite(recipeId) : addFavorite(recipeId))}
      style={{ marginLeft: "0.5rem" }}
    >
      {isFav ? "💔 Unfavorite" : "❤️ Favorite"}
    </button>
  );
};

export default FavoriteButton;
