import React, { useState } from "react";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import "./Profile.css";
import ProfileCard from "../../components/profileCard/ProfileCard";
import PostSection from "../../components/postSection/PostSection";
import RightSection from "../../components/rightSection/RightSection";
import { UilX } from "@iconscout/react-unicons";

function Profile() {
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);

  const handleLeftToggle = () => {
    setLeftActive(!leftActive);
  };

  const handleRightToggle = () => {
    setRightActive(!rightActive);
  };

  return (
    <div className="container">
      <div className="wrapper">
        {!rightActive &&
          (!leftActive ? (
            <div className="menu-toggle-left" tabindex="0">
              <label
                htmlFor="left-toggle"
                className="hamburger"
                onClick={handleLeftToggle}
              ></label>
            </div>
          ) : (
            <div className="menu-toggle-left" tabindex="0">
              <label
                htmlFor="left-toggle"
                style={{
                  color: "brown",
                  marginLeft: "-10px",
                  cursor: "pointer",
                }}
                onClick={handleLeftToggle}
              >
                <UilX size="40" />
              </label>
            </div>
          ))}

        {!leftActive &&
          (!rightActive ? (
            <div className="menu-toggle-right" tabindex="0">
              <label
                htmlFor="right-toggle"
                className="hamburger"
                onClick={handleRightToggle}
              ></label>
            </div>
          ) : (
            <div className="menu-toggle-right" tabindex="0">
              <label
                htmlFor="right-toggle"
                style={{
                  color: "brown",
                  marginRight: "-10px",
                  cursor: "pointer",
                }}
                onClick={handleRightToggle}
              >
                <UilX size="40" />
              </label>
            </div>
          ))}
      </div>
      <div className={`left ${leftActive ? "active" : ""}`}>
        <div className="content">
          {/* Left content here */}
          <ProfileLeft />
        </div>
      </div>
      <div className="middle">
        {/* Middle content here */}
        <div className="profile-center">
          <ProfileCard profilePage={true} />
          <PostSection />
        </div>
      </div>
      <div className={`right ${rightActive ? "active" : ""}`}>
        <div className="content">
          {/* Right content here */}
          <RightSection />
        </div>
      </div>
    </div>
  );
}

export default Profile;
