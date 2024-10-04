import React from "react";
import PostSection from "../../components/postSection/PostSection";
import ProfileSection from "../../components/profileSection/ProfileSection";
import RightSection from "../../components/rightSection/RightSection";
import "./Home.css";
import { useState } from "react";
import { UilX } from "@iconscout/react-unicons";

function Home() {
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
          {/* Left content here */} <ProfileSection />{" "}
        </div>
      </div>
      <div className="middle">
        {/* Middle content here */} <PostSection />{" "}
      </div>
      <div className={`right ${rightActive ? "active" : ""}`}>
        <div className="content">
          {/* Right content here */} <RightSection />{" "}
        </div>
      </div>
    </div>
  );
}

export default Home;
