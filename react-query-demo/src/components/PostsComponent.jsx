import React, { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  try {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(URL);
    console.log(response);
    if (!response.ok) throw new Error("Failed try again later");
    const res = await response.json();
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // 👇 Advanced React Query options
    staleTime: 1000 * 60, // 1 minute
    cacheTime: 1000 * 60 * 5, // 5 minutes — how long inactive data stays in cache
    refetchOnWindowFocus: false, // Disable auto-refetch when you switch back to tab
    keepPreviousData: true, // Keep old data visible while fetching new data
  });
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Posts</h2>
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        style={{
          background: "#007bff",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul style={{ textAlign: "left" }}>
        {posts?.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
