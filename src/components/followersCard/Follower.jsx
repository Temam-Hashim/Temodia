import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTION from "../../actions/UserAction.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTimeLinePosts } from "../../actions/PostAction.js";

function Follower({ person }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData);

  // Safely check if user data is available before accessing
  const [following, setFollowing] = useState(
    person.followers.includes(user?.data?._id)
  );

const handleFollow = async () => {
  try {
    if (following) {
      // Await the dispatch to ensure it completes
       dispatch(
        ACTION.unFollowUser(person._id, { currentUserId: user.data._id })
      );
    } else {
       dispatch(
        ACTION.followUser(person._id, { currentUserId: user.data._id })
      );
    }

    // After a successful follow/unfollow, update the local state
    setFollowing((prev) => !prev);

    // Update timeline posts after the follow/unfollow action
    dispatch(getTimeLinePosts(user.data._id));
  } catch (error) {
    console.error("Error following/unfollowing user:", error);
    // Optionally, handle any error state or notifications here
  }
};

  // Render nothing if auth data is not yet available
  if (!user || !user.data) return null;

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
            <span>
              {person.firstName} {person.lastName}
            </span>
            <span>@{person.username}</span>
          </div>
        </div>
      </Link>
      <button
        className={following ? "button fcu-button" : "button fc-button"}
        onClick={handleFollow}
      >
        {following ? "UNFOLLOW" : "FOLLOW"}
      </button>
    </div>
  );
}

export default Follower;
