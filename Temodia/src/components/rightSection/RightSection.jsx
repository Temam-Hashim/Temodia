import "./RightSection.css";
import Home from "../../img/home.png";
import Notification from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../trendCard/TrendCard";
// import ShareModal from "./shareModal/ShareModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RightSection() {
  // const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSection">
      <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Notification} alt="" />
        <img src={Comment} alt="" />
      </div>
      <TrendCard />
    </div>
  );
}

export default RightSection;
