import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";

function ProfileLeft() {
  return (
    <div className="profileLeft profileSection">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
}

export default ProfileLeft;
