import React from "react";
import Posts from "../posts/Posts";
import PostShare from "../postShare/PostShare";
import "./PostSection.css";

function PostSection() {
  return (
    <div className="postSection">
      <PostShare />
      <Posts />
    </div>
  );
}

export default PostSection;
