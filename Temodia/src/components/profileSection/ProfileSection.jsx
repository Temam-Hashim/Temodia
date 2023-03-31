import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";
import "./ProfileSection.css";

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
