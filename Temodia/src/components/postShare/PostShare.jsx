import { useState, useRef } from "react";
import "./PostShare.css";
// import ProfileImage from "../../img/profileImg.jpg";
import {
  UilScenery,
  UilTimes,
  UilLocationPoint,
  UilPlayCircle,
  UilSchedule,
} from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction.js";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

function PostShare() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.authData);
  const uploading = useSelector((state) => state.PostReducer.uploading);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();

  const Reset = () => {
    setImage(null);
    desc.current.value = "";
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (desc.current.value === "" && image === null) {
      alert("Please Write Something or Select an Image ");
    } else {
      const newPost = {
        userId: user.data._id,
        desc: desc.current.value,
      };
      if (image) {
        const data = new FormData();
        const filename = Date.now() + image.name;
        data.append("name", filename);
        data.append("file", image);
        newPost.image = filename;

        try {
          dispatch(uploadImage(data));
        } catch (error) {
          console.log(error);
        }
      }
      dispatch(uploadPost(newPost));
      Reset();
      window.location.replace("/home");
    }
  };

  // console.log(user.data._id);

  return (
    <div className="postShare">
      <section className="shareField">
        <Link to={`/profile/${user.data._id}`} className="router-link">
          <img
            src={
              user.data.profilePicture
                ? PF + user.data.profilePicture
                : PF + "default_profile.png"
            }
            alt=""
          />
        </Link>
        <input
          type="text"
          ref={desc}
          required={true}
          placeholder="what's is in your mind ?"
        />
      </section>

      <div>
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option">
            <UilPlayCircle />
            Video
          </div>
          <div className="option">
            <UilLocationPoint />
            Location
          </div>
          <div className="option">
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {!uploading ? "Share" : <Loader data=" Uploading " />}
          </button>
          <div div style={{ display: "none" }}>
            <input
              id="myImage"
              type="file"
              accept="image/*"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {/* display image */}
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} className="dismissBtn" />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
