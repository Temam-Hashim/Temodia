import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../profileModal/ProfileModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as UserApi from "./../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

function InfoCard() {
  const [modelOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  
  const [profileUser, setProfileUser] = useState({});
  const user = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.data._id) {
        setProfileUser(user);
      } else {
        const newProfileUser = await UserApi.getUser(profileUserId);
        setProfileUser(newProfileUser);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Profile Information</h4>
        {user.data._id === profileUserId && (
          <div>
            {/* import profile info modal */}
            <ProfileModal
              modelOpened={modelOpened}
              setModalOpened={setModalOpened}
              data={user.data}
            />
          </div>
        )}
      </div>
      <div className="info">
        <span>
          <b>Name</b>
        </span>
        <span>
          {profileUser.data &&
            profileUser.data.firstName + " " + profileUser.data.lastName}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>
          {profileUser.data
            ? profileUser.data.relationship
            : "No martial status"}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives </b>{" "}
        </span>
        <span>
          {profileUser.data ? profileUser.data.livesIn : "No address found"}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>
          {" "}
          {profileUser.data ? profileUser.data.worksAt : "No work address "}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0",
        }}
      >
        {user.data._id === profileUserId && (
          <>
            <button
              className="button edit-button"
              onClick={() => setModalOpened(true)}
            >
              {" "}
              <UilPen width="1rem" height="1.2rem" className="edit-icon" />
              Edit Profile
            </button>
            <button className="button logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
