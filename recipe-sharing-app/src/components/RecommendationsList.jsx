import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) return <p>No recommendations yet.</p>;

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.map((r) => (
        <div key={r.id}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <Link to={`/recipes/${r.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
