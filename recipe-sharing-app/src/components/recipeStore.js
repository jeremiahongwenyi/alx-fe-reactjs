// import { create } from 'zustand'

// export const useRecipeStore = create(set => ({
//     recipes: [],
//     addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
//     setRecipes: (recipes) => set({ recipes }),
//     deleteRecipe: (recipeId) => set((state) => {
//         const newRecipe = []
//         state.recipes.array.forEach(recipe => {
//             if (recipe.id === recipeId) {
//                 return
//             }
//             newRecipe.push(recipe)

//         });
//         return { recipes: newRecipe }
//     }),
//     updateRecipe: (recipeId, title, description)=> set ((state)=>{
//         const newRecipe = []
//         state.recipes.array.forEach(recipe => {
//             if (recipe.id === recipeId) {
//                 const updatedData = {id:recipeId, title:title, description:description}
//                 newRecipe.push(updatedData)
//             }
//             newRecipe.push(recipe)

//         });
//         return { recipes: newRecipe }
//     })
// }));



import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  setRecipes: (recipes) => set({ recipes }),

  // ✅ Fixed deleteRecipe
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),

  // ✅ Fixed updateRecipe
  updateRecipe: (recipeId, title, description) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, title, description } : recipe
      ),
    })),
}));
