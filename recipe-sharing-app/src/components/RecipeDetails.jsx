import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import FavoriteButton from "./FavoriteButton";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => r.id === recipeId)
  );
  const navigate = useNavigate();

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>← Back</button>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <p>
          <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
        </p>
      )}
      {typeof recipe.prepTime === "number" && (
        <p>Prep time: {recipe.prepTime} min</p>
      )}

      <FavoriteButton recipeId={recipe.id} />
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
