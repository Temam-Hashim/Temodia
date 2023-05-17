import React, { useState } from "react";
import "./Message.css";
import { UilX } from "@iconscout/react-unicons";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import RightSection from "../../components/rightSection/RightSection";
import MessageUser from "../../components/messageUser/MessageUser";
import MessageBody from "../../components/messageBody/MessageBody";

function Message() {
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
          <LogoSearch />
          <MessageUser />
        </div>
      </div>
      <div className="middle">
        {/* Middle content here */}
        <div className="profile-center">
          {" "}
          <MessageBody />{" "}
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

export default Message;
