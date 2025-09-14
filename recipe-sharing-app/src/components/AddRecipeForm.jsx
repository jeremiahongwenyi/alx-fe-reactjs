// src/components/AddRecipeForm.jsx
import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(""); // comma-separated input
  const [prepTime, setPrepTime] = useState(""); // minutes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedIngredients = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const prep = prepTime === "" ? undefined : Number(prepTime);

    addRecipe({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      ingredients: parsedIngredients,
      prepTime: typeof prep === "number" ? prep : undefined,
    });

    setTitle("");
    setDescription("");
    setIngredients("");
    setPrepTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma separated)"
        style={{ marginLeft: "0.5rem" }}
      />
      <input
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
        placeholder="Prep time (min)"
        style={{ marginLeft: "0.5rem", width: "140px" }}
      />
      <div style={{ marginTop: "0.5rem" }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", minHeight: "60px" }}
        />
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
