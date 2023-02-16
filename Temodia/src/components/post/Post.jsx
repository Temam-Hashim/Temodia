import React from "react";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Like from "../../img/like.png";
import UnLike from "../../img/notlike.png";
import "./Post.css";

function Post({ data }) {
  return (
    <div className="post">
      <img src={data.img} alt="" className="post-img" />

      <div className="postReact">
        <img src={data.liked ? Like : UnLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span className="likes">{data.like} likes</span>
      <div className="detail">
        <span>
          <b> {data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
}

export default Post;
