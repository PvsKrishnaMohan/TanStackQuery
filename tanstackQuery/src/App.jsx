import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./API/api";
import PostsData from "./Components/PostsData";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <>
      <h1>Vite + React + TanStack Query</h1>
      <PostsData/>
    </>
  );
}

export default App;
