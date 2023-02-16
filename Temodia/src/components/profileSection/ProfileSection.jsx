import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";
import "./ProfileSection.css";
import { Link } from "react-router-dom";

function ProfileSection() {
  return (
    <div className="profileSection">
      <LogoSearch />
      <ProfileCard profilePage={false} />
      <FollowersCard />
    </div>
  );
}

export default ProfileSection;
