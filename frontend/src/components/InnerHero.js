import React from "react";

const InnerHero = ({ title, subtitle }) => {
  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{ backgroundColor: "#15095e", minHeight: "100px" }}
    >
      <div className="container text-center text-white">
        <h2>{title}</h2>
        <p style={{ fontSize: "14px" }}>{subtitle}</p>
      </div>
    </div>
  );
};

export default InnerHero;
