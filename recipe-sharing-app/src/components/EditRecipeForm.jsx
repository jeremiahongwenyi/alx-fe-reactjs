// src/components/EditRecipeForm.jsx
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const [title, setTitle] = useState(recipe.title || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [ingredients, setIngredients] = useState(
    (recipe.ingredients || []).join(", ")
  );
  const [prepTime, setPrepTime] = useState(recipe.prepTime ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);
    const prep = prepTime === "" ? undefined : Number(prepTime);

    updateRecipe(recipe.id, {
      title: title.trim(),
      description: description.trim(),
      ingredients: parsedIngredients,
      prepTime: typeof prep === "number" ? prep : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma separated)"
      />
      <input
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Prep time (min)"
      />
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Update
      </button>
    </form>
  );
};

export default EditRecipeForm;
