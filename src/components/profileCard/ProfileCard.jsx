import React, { useState, useEffect } from "react";
// import FollowersCard from "../followersCard/FollowersCard";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as USERS from "../../api/UserRequest.js";
import { getTimeLinePosts } from "../../actions/PostAction.js";

import { useParams } from "react-router-dom";

function ProfileCard({ profilePage }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const currentUser = useSelector((state) => state.AuthReducer.authData);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { posts, loading } = useSelector((state) => state.PostReducer);

  const params = useParams();
  const profileUserId = params.id || currentUser.data._id;

  useEffect(() => {
    dispatch(getTimeLinePosts(profileUserId));
    const fetchProfileUser = async () => {
      if (profileUserId === currentUser.data._id) {
        setUser(currentUser);
      } else {
        const newProfileUser = await USERS.getUser(profileUserId);
        setUser(newProfileUser);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user, currentUser, dispatch]);

  return (
    <div className="ProfileCard" style={{ borderRadius: 10 }}>
      <div className="profileImages">
        <img
          src={
            user.data?.coverPicture
              ? PF + user.data?.coverPicture
              : PF + "default_bg.jpg"
          }
          alt=""
          style={{ height: profilePage && "280px" }}
        />
        <img
          src={
            user.data?.profilePicture
              ? PF + user.data?.profilePicture
              : PF + "default_profile.png"
          }
          alt=""
        />
      </div>

      <div className="profileName">
        <span>{user.data?.firstName + " " + user.data?.lastName}</span>
        <span>{user.data ? user.data?.worksAt : "Write Your Profession"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.data?.following?.length}</span>
            <span>Following</span>
          </div>

          <div className="vl">|</div>
          <div className="follow">
            <span>{user.data?.followers?.length}</span>
            <span>Followers</span>
          </div>
          {profilePage && (
            <>
              <div className="vl">|</div>
              <div className="follow">
                <span>
                  {loading ? (
                    <span>Loading your posts...</span>
                  ) : (
                    posts.filter((post) => post.userId === user.data?._id)
                      .length
                  )}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>

      {profilePage ? (
        ""
      ) : (
        <Link to={`/profile/${user.data?._id}`} className="router-link">
          <button className="button profile-button">My Profile</button>
        </Link>
      )}

      <hr />
      {/* followers card */}
    </div>
  );
}

export default ProfileCard;
