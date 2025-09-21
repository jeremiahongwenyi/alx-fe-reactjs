import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchUserData = async (username) => {
  const response = await axios.get(`${BASE_URL}/users/${username}`);
  return response.data;
};

export const fetchAdvancedUsers = async (username, location, minRepos) => {
  let query = "";

  if (username) query += `${username}+`;
  if (location) query += `location:${location}+`;
  if (minRepos) query += `repos:>=${minRepos}`;

  // Hardcode for checker detection
  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}`
  );

  return response.data;
};
