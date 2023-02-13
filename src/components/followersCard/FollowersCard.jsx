import React from "react";
import { Followers } from "../../data/followersData";
import "./FollowersCard.css";

function FollowersCard() {
  return (
    <div className="followersCard">
      <h3 className="fc-title">Who is following you</h3>
      {Followers.map((followers, id) => {
        return (
          <div className="followers">
            <img src={followers.img} alt="" className="followerImg" />
            <div>
              <div className="name">
                <span>{followers.name}</span>
                <span>@{followers.username}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
}

export default FollowersCard;
