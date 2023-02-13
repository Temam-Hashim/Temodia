import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
// import FollowersCard from "../followersCard/FollowersCard";
import "./ProfileCard.css";

function ProfileCard() {
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
        </div>
        <hr />
      </div>
      <span>My Profile</span>
      <hr />

      {/* followers card */}
      {/* <FollowersCard /> */}
    </div>
  );
}

export default ProfileCard;
