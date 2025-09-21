import { useState } from "react";
import { fetchAdvancedUsers, fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      // If only username is provided, use fetchUserData
      if (username && !location && !minRepos) {
        const singleUser = await fetchUserData(username);
        setResults([singleUser]); // put in array for consistency
      } else {
        const data = await fetchAdvancedUsers(username, location, minRepos);
        setResults(data.items); // GitHub search API returns `items`
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          value={username}
          placeholder="Enter GitHub username"
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={location}
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={minRepos}
          placeholder="Min Repositories"
          onChange={(e) => setMinRepos(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      <div className="mt-6">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 && (
          <div className="grid gap-4">
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-4 border rounded shadow-sm"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">{user.name || user.login}</h3>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
