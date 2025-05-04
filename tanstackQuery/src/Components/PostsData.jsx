import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPosts, addPost, tagsData } from "../API/api";

const PostsData = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {
    data: tagData,
    isError: isTagsError,
    isLoading: isTagsLoading,
  } = useQuery({
    queryKey: ["tagData"],
    queryFn: tagsData,
  });

  const {
    mutate,
    isPending,
    isError: isPostError,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title =formData.get("title");
    const tags = Array.from(formData.keys()).filter((key)=> formData.get(key) === "on");
    console.log(title,tags);
  }
  return (
    <div className="container">
      <h1>Posts Data</h1>

      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>{error?.message}</h2>}

      {isTagsLoading && <h2>Loading Tags...</h2>}
      {isTagsError && <h2>{isTagsError?.message}</h2>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" name = "title" placeholder="add Text" />
        <div className="checkBoxContainer">
        {
           tagData?.map((eachTag) => {
            return(
                <div  key={eachTag}>
                    <input type="checkbox" name={eachTag} id={eachTag} />
                    <label htmlFor={eachTag}>{eachTag}</label>
                </div>
            )
           }) 
        }
        </div>
        <button>Add post</button>
      </form>
      {data?.map((eachPost) => {
        return (
          <div className="post" key={eachPost.id}>
            <h3>{eachPost.title}</h3>
            {eachPost.tags.map((eachTag) => {
              return <span key={eachTag}>{eachTag}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PostsData;
