import React from "react";
import "./LogoSearch.css";
import logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
function LogoSearch() {
  return (
    <div className="logoSearch">
      <img src={logo} alt="" />
      <div className="search">
        <input type="text" className="searchInput" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
}

export default LogoSearch;
