import { create } from "zustand";

export const useRecipeStore = create((set, get) => {
  // Helper: filter recipes by current filters
  const computeFiltered = (recipes, searchTerm, ingredientFilter, maxPrepTime) => {
    const term = (searchTerm || "").trim().toLowerCase();
    const ingredient = (ingredientFilter || "").trim().toLowerCase();
    const maxTime =
      maxPrepTime === null || maxPrepTime === undefined || maxPrepTime === ""
        ? null
        : Number(maxPrepTime);

    return recipes.filter((recipe) => {
      const title = (recipe.title || "").toLowerCase();
      const desc = (recipe.description || "").toLowerCase();
      const ingredientsText = recipe.ingredients
        ? (Array.isArray(recipe.ingredients)
            ? recipe.ingredients.join(" ")
            : String(recipe.ingredients)
          ).toLowerCase()
        : "";

      const matchesTerm =
        !term ||
        title.includes(term) ||
        desc.includes(term) ||
        ingredientsText.includes(term);

      const matchesIngredient = !ingredient || ingredientsText.includes(ingredient);

      const matchesPrep =
        !maxTime ||
        (typeof recipe.prepTime === "number" && recipe.prepTime <= maxTime);

      return matchesTerm && matchesIngredient && matchesPrep;
    });
  };

  return {
    // data
    recipes: [],
    filteredRecipes: [],
    favorites: [], // ✅ new
    recommendations: [], // ✅ new

    // filters
    searchTerm: "",
    ingredientFilter: "",
    maxPrepTime: null,

    // CRUD operations (each recomputes filteredRecipes)
    setRecipes: (recipes) =>
      set((state) => ({
        recipes,
        filteredRecipes: computeFiltered(
          recipes,
          state.searchTerm,
          state.ingredientFilter,
          state.maxPrepTime
        ),
      })),

    addRecipe: (newRecipe) =>
      set((state) => {
        const recipes = [...state.recipes, newRecipe];
        return {
          recipes,
          filteredRecipes: computeFiltered(
            recipes,
            state.searchTerm,
            state.ingredientFilter,
            state.maxPrepTime
          ),
        };
      }),

    deleteRecipe: (recipeId) =>
      set((state) => {
        const recipes = state.recipes.filter((r) => r.id !== recipeId);
        return {
          recipes,
          filteredRecipes: computeFiltered(
            recipes,
            state.searchTerm,
            state.ingredientFilter,
            state.maxPrepTime
          ),
          favorites: state.favorites.filter((id) => id !== recipeId), // clean up favorites
        };
      }),

    updateRecipe: (recipeId, updates) =>
      set((state) => {
        const recipes = state.recipes.map((r) =>
          r.id === recipeId ? { ...r, ...updates } : r
        );
        return {
          recipes,
          filteredRecipes: computeFiltered(
            recipes,
            state.searchTerm,
            state.ingredientFilter,
            state.maxPrepTime
          ),
        };
      }),

    // filter setters
    setSearchTerm: (term) =>
      set((state) => ({
        searchTerm: term,
        filteredRecipes: computeFiltered(
          state.recipes,
          term,
          state.ingredientFilter,
          state.maxPrepTime
        ),
      })),

    setIngredientFilter: (ingredient) =>
      set((state) => ({
        ingredientFilter: ingredient,
        filteredRecipes: computeFiltered(
          state.recipes,
          state.searchTerm,
          ingredient,
          state.maxPrepTime
        ),
      })),

    setMaxPrepTime: (maxTime) =>
      set((state) => {
        const value = maxTime === "" || maxTime === null ? null : Number(maxTime);
        return {
          maxPrepTime: value,
          filteredRecipes: computeFiltered(
            state.recipes,
            state.searchTerm,
            state.ingredientFilter,
            value
          ),
        };
      }),

    clearFilters: () =>
      set((state) => ({
        searchTerm: "",
        ingredientFilter: "",
        maxPrepTime: null,
        filteredRecipes: computeFiltered(state.recipes, "", "", null),
      })),

    // ✅ favorites
    addFavorite: (recipeId) =>
      set((state) => ({
        favorites: state.favorites.includes(recipeId)
          ? state.favorites
          : [...state.favorites, recipeId],
      })),

    removeFavorite: (recipeId) =>
      set((state) => ({
        favorites: state.favorites.filter((id) => id !== recipeId),
      })),

    // ✅ simple mock recommendations
    generateRecommendations: () =>
      set((state) => {
        const recommended = state.recipes.filter(
          (r) =>
            !state.favorites.includes(r.id) &&
            state.recipes.some(
              (fav) =>
                state.favorites.includes(fav.id) &&
                fav.ingredients?.some((ing) =>
                  r.ingredients?.includes(ing)
                )
            )
        );
        return { recommendations: recommended.slice(0, 3) }; // limit to 3
      }),
  };
});
