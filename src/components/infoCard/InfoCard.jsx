import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";

function InfoCard() {
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your Profile Info </h4>
        <div>
          <UilPen width="1rem" height="1.2rem" />
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
