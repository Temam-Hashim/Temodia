import "./RightSection.css";
import TrendCard from "../trendCard/TrendCard";
import NavIcons from "../navIcons/NavIcons";
// import ShareModal from "./shareModal/ShareModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RightSection() {
  // const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSection">
      <NavIcons />
      <TrendCard />
    </div>
  );
}

export default RightSection;
