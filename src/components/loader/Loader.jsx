import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

function Loader({ data }) {
  return (
    <div
      style={{
        width: "20px",
        height: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
      }}
    >
      {data + " "}
      <CirclesWithBar type="ThreeDots" color="white" height="25" width="25" />
    </div>
  );
}

export default Loader;
