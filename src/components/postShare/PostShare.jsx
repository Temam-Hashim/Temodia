import { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImage from "../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

function PostShare() {
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  return (
    <div className="postShare">
      <img src={ProfileImage} alt="" />
      <div>
        <input type="text" placeholder="what's is in your mind ?" />

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
          <button className="button ps-button">Share</button>
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
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PostShare;
