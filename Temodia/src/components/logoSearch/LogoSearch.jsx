import React from "react";
import "./LogoSearch.css";
import logo from "../../img/logo_1.png";
import { UilSearch } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
function LogoSearch() {
  return (
    <div className="logoSearch">
      <Link className="router-link" to="/">
        <img src={logo} alt="" className="logo-icon" />
      </Link>
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
