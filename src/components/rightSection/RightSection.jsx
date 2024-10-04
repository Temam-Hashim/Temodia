import "./RightSection.css";
import Home from "../../img/home.png";
import Notification from "../../img/noti.png";
import Comment from "../../img/comment.png";
import {
  UilSetting,
  UilEstate,
  UilComment,
  UilBell,
} from "@iconscout/react-unicons";

import TrendCard from "../trendCard/TrendCard";
import { Link } from "react-router-dom";
// import ShareModal from "./shareModal/ShareModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RightSection() {
  // const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSection">
      <div className="navIcons">
        <Link to="/" className="Link">
          <UilEstate size="28" color="#C11B64" />
        </Link>
        <Link to="/" className="Link">
          <UilBell size="28" color="#132975" />
        </Link>
        <Link to="/" className="Link">
          <UilSetting size="28" color="#129CB8" />
        </Link>

        <Link to="/message" className="Link">
          <UilComment size="28" color="#6112B8" />
        </Link>
      </div>

      <TrendCard />
    </div>
  );
}

export default RightSection;
