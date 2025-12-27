import React from "react";
import watermarkLeft from "../images/watermark1.png";
import watermarkRight from "../images/watermark2.png";

const Services = ({ spanText, heading, paragraph, buttonText, bgColor }) => {
  return (
    <div
      className="container-fluid py-5 services-section"
      style={{ backgroundColor: bgColor || "#151948" }}
    >
      {/* Watermark Shapes */}
      <img src={watermarkLeft} alt="water-left" className="service-watermark left" />
      <img src={watermarkRight} alt="water-right" className="service-watermark right" />

      <div className="container text-center text-white position-relative">
        {spanText && (
          <span
            className="text-uppercase fw-bold"
            style={{ fontSize: "12px", color: "#ffffff" }}
          >
            {spanText}
          </span>
        )}

        {heading && <h2 className="mt-2 mb-3">{heading}</h2>}

        {paragraph && (
          <p
            className="mb-4"
            style={{ lineHeight: "26px", fontSize: "16px" }}
          >
            {paragraph}
          </p>
        )}

        {buttonText && (
          <button
            type="button"
            className="btn btn-lg rounded-pill px-4"
            style={{
              backgroundColor: "#00c99c",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Services;
