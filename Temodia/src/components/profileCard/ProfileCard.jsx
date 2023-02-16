import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
// import FollowersCard from "../followersCard/FollowersCard";
import "./ProfileCard.css";
import { Link } from "react-router-dom";

function ProfileCard({ profilePage }) {
  return (
    <div className="ProfileCard" style={{ borderRadius: 10 }}>
      <div className="profileImages">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="profileName">
        <span>Temam Hashim</span>
        <span>Software Developer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6720</span>
            <span>Followings</span>
          </div>
          <div className="vl">|</div>
          <div className="follow">
            <span>22</span>
            <span>Followers</span>
          </div>
          {profilePage && (
            <>
              <div className="vl">|</div>
              <div className="follow">
                <span>5</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>

      {profilePage ? (
        ""
      ) : (
        <Link to="/profile" class="router-link">
          <button className="button profile-button">My Profile</button>
        </Link>
      )}

      <hr />
      {/* followers card */}
    </div>
  );
}

export default ProfileCard;
