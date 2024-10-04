import { Modal, useMantineTheme } from "@mantine/core";
import { UilCamera } from "@iconscout/react-unicons";
import "./ProfileModal.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction.js";
import { updateUser } from "../../actions/UserAction.js";

function ProfileModal({ modelOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const user = useSelector((state) => state.AuthReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (e.target.name === "profilePicture") {
        setProfilePicture(img);
      }
      if (e.target.name === "coverPicture") {
        setCoverPicture(img);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    UserData.currentUserId = user.data._id;
    if (profilePicture) {
      let data = new FormData();
      const fileName = Date.now() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverPicture) {
      let data = new FormData();
      const fileName = Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(params.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modelOpened}
        onClose={() => setModalOpened(false)}
        overlayOpacity={0.82}
        overlayBlur={3}
        size={window.innerWidth >= 699 ? "55%" : "100%"}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        // style={{ backgroundColor: "gray" }}
      >
        {/* Modal content */}
        <div className="modal-body">
          <form action="" className="modal-form">
            <h3>Profile Information</h3>
            <div class="form-group">
              <input
                type="text"
                className="modal-input"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
              />
              <input
                type="text"
                className="modal-input"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div>
              <input
                type="text"
                className="modal-input"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="text"
                className="modal-input"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                value={formData.mobile}
              />
            </div>

            <div>
              <input
                type="text"
                className="modal-input"
                name="livesIn"
                placeholder="Lives In"
                onChange={handleChange}
                value={formData.livesIn}
              />
              <input
                type="text"
                className="modal-input"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                value={formData.country}
              />
            </div>
            <div>
              <input
                type="text"
                className="modal-input"
                name="relationship"
                placeholder="Relationship Status"
                onChange={handleChange}
                value={formData.relationship}
              />
              <input
                type="text"
                className="modal-input"
                name="hobbies"
                placeholder="Hobbies"
                onChange={handleChange}
                value={formData.hobbies}
              />
            </div>
            <div>
              <input
                type="text"
                className="modal-input"
                name="worksAt"
                placeholder="Works At"
                onChange={handleChange}
                value={formData.worksAt}
              />
              <input
                type="date"
                className="modal-input"
                name="dob"
                placeholder="Date of Birth"
                onChange={handleChange}
                value={formData.dob}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="photo-div">
              {/* profile Image */}
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                style={{ display: "none" }}
                onChange={onImageChange}
              />
              {/* cover Image */}
              <input
                type="file"
                name="coverPicture"
                id="coverPicture"
                style={{ display: "none" }}
                onChange={onImageChange}
              />

              <label htmlFor="profilePicture" className="profileImage">
                <UilCamera size="30" color="cyan" />
                <br /> Upload Profile Image
              </label>

              <label htmlFor="coverPicture" className="coverImage">
                <UilCamera size="30" color="cyan" />
                <br /> Upload Cover Image
              </label>
            </div>
            <button className="button modal-button" onClick={handleSubmit}>
              Update
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default ProfileModal;
