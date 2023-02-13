import React from "react";
import "./Posts.css";
import { PostData } from "../../data/postData";
import Post from "../post/Post";

function Posts() {
  return (
    <div className="posts">
      {PostData.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
}

export default Posts;
