import React, { useState } from "react";
import "./TrendCard.css";
import { TrendData } from "../../data/trendData";
import ShareModal from "../rightSection/shareModal/ShareModal";

function TrendCard() {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {TrendData.map((trend) => {
        return (
          <div className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      {/* modal */}
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
}

export default TrendCard;
