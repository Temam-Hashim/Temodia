import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useState } from "react";

function InfoCard() {
  const [modelOpened, setModalOpened] = useState(false);
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your Profile Info </h4>
        <div>
          <UilPen
            width="1rem"
            height="1.2rem"
            className="edit-icon"
            onClick={() => setModalOpened(true)}
          />
          {/* import profile info modal */}
          <ProfileModal
            modelOpened={modelOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span> in Relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives </b>
        </span>
        <span> Addis Ababa, Ethiopia</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span> Cooperative Bank</span>
      </div>
      <button className="button logout-button">Logout</button>
    </div>
  );
}

export default InfoCard;
