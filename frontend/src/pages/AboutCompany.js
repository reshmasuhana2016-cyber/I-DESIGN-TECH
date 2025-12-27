import React from "react";
import InnerHero from "../components/InnerHero";
import PromoSection from "../components/PromoSection";
import image10 from "../images/image10.png";
import Technologies from "../components/Technologies.js";
import FloatingShapes from "../components/FloatingShapes.js";

const AboutCompany = () => {
  return (
    <div>
      <InnerHero
  title="About IDWT"
  subtitle="i Design Web Technologies"
/>

< FloatingShapes />
      <PromoSection />

    <div className="container-fluid " style={{ backgroundColor: "#151948" }}>
  <div className="container">
    <div className="row align-items-center">

      {/* Image Section */}
      <div className="col-md-6 text-center mb-4 mb-md-0">
        <img
          src={image10}
          alt="Services Illustration"
          className="img-fluid"
          style={{ maxWidth: "90%" }}
        />
      </div>

      {/* Content Section */}
      <div className="col-md-6 text-white">
        <span
          className="text-uppercase"
          style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }}
        >
          Features
        </span>

        <h2 className="mt-2 mb-3 fw-bold">
          Our Affordable Services <br /> From iDWT...
        </h2>

        <p
          style={{
            lineHeight: "26px",
            fontSize: "16px",
            color: "#cfd3ff",
          }}
        >
          We provide marketing services to startups and small businesses
          looking for a partner in digital media, design & development,
          lead generation and communications requirements.
        </p>
      </div>

    </div>
  </div>
</div>


      <Technologies />
    </div>
  );
};

export default AboutCompany;
