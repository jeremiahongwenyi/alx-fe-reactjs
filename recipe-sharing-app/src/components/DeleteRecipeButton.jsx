// src/components/DeleteRecipeButton.jsx
import { useRecipeStore } from "./recipeStore";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate("/");
  };

  return (
    <button onClick={handleDelete} style={{ marginLeft: "1rem" }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
