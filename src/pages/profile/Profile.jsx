import React from "react";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSection from "../../components/postSection/PostSection";

function Profile() {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard />
        <PostSection />
      </div>
    </div>
  );
}

export default Profile;
