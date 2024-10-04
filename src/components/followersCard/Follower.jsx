import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTION from "../../actions/UserAction.js";
import * as REQUEST from "../../api/UserRequest.js";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTimeLinePosts } from "../../actions/PostAction.js";

function Follower({ person }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user.data._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(
          ACTION.unFollowUser(person._id, { currentUserId: user.data._id })
        )
      : dispatch(
          ACTION.followUser(person._id, { currentUserId: user.data._id })
        );
    setFollowing((prev) => !prev);
    dispatch(getTimeLinePosts(user.data._id));
  };

  return (
    <div className="followers">
      <Link to={`/profile/${person._id}`} className="router-link">
        <img
          src={
            person.profilePicture
              ? PF + person.profilePicture
              : PF + "default_profile.png"
          }
          alt=""
          className="followerImg"
        />
      </Link>
      <Link to={`/profile/${person._id}`} className="router-link">
        <div>
          <div className="name">
            <span>{person.firstName}</span>
            <span>@{person.username}</span>
          </div>
        </div>
      </Link>
      <button
        className={following ? "button fcu-button " : "button fc-button "}
        onClick={handleFollow}
      >
        {following ? "Unfolow" : "Follow"}
      </button>
    </div>
  );
}

export default Follower;
