import React, { useState } from "react";
import commentIcon from "../../img/comment.png";
import Comment from "../commentModal/Comment";
import Share from "../../img/share.png";
import Like from "../../img/like.png";
import UnLike from "../../img/notlike.png";
import "./Post.css";
import { likePost } from "../../api/PostRequest.js";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import { format } from "timeago.js";

function Post({ data }) {
  const user = useSelector((state) => state.AuthReducer.authData);
  const [liked, setLiked] = useState(data.likes?.includes(user.data._id));
  const [likeCounter, setLikeCounter] = useState(data.likes?.length);
  const [modelOpened, setModalOpened] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLikes = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user.data._id);
    liked
      ? setLikeCounter((prev) => prev - 1)
      : setLikeCounter((prev) => prev + 1);
  };

  return (
    <div className="post">
      {/* comment modal */}
      <div>
        <Comment
          modelOpened={modelOpened}
          setModalOpened={setModalOpened}
          data={data}
        />
      </div>
      {/* poster detail */}
      <Link to={`/profile/${data.userId._id}`} className="router-link">
        <div className="row-row">
          <img
            class="commenter-img"
            src={
              data?.userId?.profilePicture
                ? PF + data?.userId?.profilePicture
                : PF + "default_profile.png"
            }
            alt=""
          />
          <div className="user-detail">
            <h4 className="user-title">
              {data?.userId?.firstName + " " + data?.userId?.lastName}
            </h4>
            <span style={{marginLeft:-20}}>
              {format(data?.createdAt)}
            </span>
          </div>
        </div>
      </Link>

      {/* post detail */}
      <div className="detail">
        <span> {data?.desc}</span>
      </div>
      <img
        src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data?.image : ""}
        alt=""
      />
      {/* </a> */}
      <div className="postReact">
        <img
          src={liked ? Like : UnLike}
          alt=""
          style={{
            cursor: "pointer",
          }}
          onClick={handleLikes}
        />
        <img src={commentIcon} alt="" onClick={() => setModalOpened(true)} />
        <img src={Share} alt="" />
      </div>
      <span className="likes">{likeCounter} likes</span>
    </div>
  );
}

export default Post;
