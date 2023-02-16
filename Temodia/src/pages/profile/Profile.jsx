import React from "react";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSection from "../../components/postSection/PostSection";
import RightSection from "../../components/rightSection/RightSection";

function Profile() {
  return (
    <div className="profile">
      <ProfileLeft />
      <div className="profile-center">
        <ProfileCard profilePage={true} />
        <PostSection />
      </div>
      <RightSection />
    </div>
  );
}

export default Profile;
