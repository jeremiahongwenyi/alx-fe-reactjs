import axios from "axios";

const BASE_URL = "https://api.github.com/users";

// Example function (not fully used yet)
export const searchUsers = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
