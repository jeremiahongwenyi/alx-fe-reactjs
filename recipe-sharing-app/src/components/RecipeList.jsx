// src/components/RecipeList.jsx
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const filtered = useRecipeStore((s) => s.filteredRecipes);
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const ingredientFilter = useRecipeStore((s) => s.ingredientFilter);
  const maxPrepTime = useRecipeStore((s) => s.maxPrepTime);

  const filtersActive =
    (searchTerm && searchTerm.trim() !== "") ||
    (ingredientFilter && ingredientFilter.trim() !== "") ||
    (maxPrepTime !== null && maxPrepTime !== undefined && maxPrepTime !== "");

  const recipesToShow = filtersActive ? filtered : recipes;

  return (
    <div>
      <h2>Recipe List</h2>
      {recipesToShow.length === 0 ? (
        <p>
          No recipes found{filtersActive ? " (try clearing filters)" : " yet"}.
        </p>
      ) : (
        recipesToShow.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "1rem" }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
              </p>
            )}
            {typeof recipe.prepTime === "number" && (
              <p>Prep time: {recipe.prepTime} min</p>
            )}
            <Link to={`/recipes/${recipe.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
