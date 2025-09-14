// src/components/SearchBar.jsx
import React from "react";
import { useRecipeStore } from "./recipeStore";

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const ingredientFilter = useRecipeStore((s) => s.ingredientFilter);
  const maxPrepTime = useRecipeStore((s) => s.maxPrepTime);

  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);
  const setIngredientFilter = useRecipeStore((s) => s.setIngredientFilter);
  const setMaxPrepTime = useRecipeStore((s) => s.setMaxPrepTime);
  const clearFilters = useRecipeStore((s) => s.clearFilters);

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search title / description / ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by ingredient..."
        value={ingredientFilter}
        onChange={(e) => setIngredientFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max prep time (min)"
        value={maxPrepTime ?? ""}
        onChange={(e) => setMaxPrepTime(e.target.value)}
        style={{ width: "160px" }}
      />
      <button onClick={clearFilters}>Clear</button>
    </div>
  );
};

export default SearchBar;
