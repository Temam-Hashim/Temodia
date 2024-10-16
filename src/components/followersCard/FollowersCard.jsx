import "./FollowersCard.css";
import {useSelector } from "react-redux";

import { useState, useEffect } from "react";
import * as USERS from "../../api/UserRequest.js";
import Follower from "./Follower";

function FollowersCard() {
  const user = useSelector((state) => state.AuthReducer.authData);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchAllUses = async () => {
      const lists = await USERS.getAllUser();
      setFollowers(lists.data);
    };
    fetchAllUses();
  }, []);

  return (
    <div className="followersCard">
      <h3 className="fc-title">Peoples you may know</h3>
      {followers.map((person, id) => {
        if (user.data._id !== person._id) {
          return <Follower person={person} key={id} />;
        }
        return  null;
      })}
    </div>
  );
}

export default FollowersCard;
