import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // setRecipes(data);
getCatFact()
  }, []);

  const getCatFact = ()=>{
    const myheaders = new Headers()
    console.log('headers here', myheaders);
    
    const res = fetch('https://Cat-Fact-API.proxy-production.allthingsdev.co/fact', myheaders)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Recipe Sharing Platform
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="bg-white rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 text-sm">{recipe.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
