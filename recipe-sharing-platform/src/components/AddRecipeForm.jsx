import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // simple validation
    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      setError("All fields are required!");
      return;
    }

    const ingredientList = ingredients.split(",").map((item) => item.trim());
    if (ingredientList.length < 2) {
      setError("Please include at least two ingredients (comma-separated).");
      return;
    }

    // mock submission
    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientList,
      instructions: steps.split(".").map((s) => s.trim()).filter(Boolean),
    };

    console.log("✅ New recipe added:", newRecipe);
    setSuccess("Recipe added successfully!");
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🍳 Add a New Recipe
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipe Title
            </label>
            <input
              type="text"
              placeholder="e.g., Pancakes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ingredients (comma-separated)
            </label>
            <textarea
              rows="3"
              placeholder="e.g., Flour, Milk, Eggs, Sugar"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Steps */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Preparation Steps
            </label>
            <textarea
              rows="4"
              placeholder="Describe the cooking steps..."
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
