import React from "react";
import image1 from "../images/image1.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PromoSection from "../components/PromoSection.js";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import Services from "../components/Services.js";
import Testimonial from "../components/Testimonial.js";
import Technologies from "../components/Technologies.js";
import FloatingShapes from "../components/FloatingShapes.js";

const Home = () => {
  return (
    <>
    <FloatingShapes />
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f6f7ff" }}
      >
        <div className="container">
          <div className="row align-items-center gy-4">
            {/* Left Content */}
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="fw-bold mb-3" style={{ color: "#263b5e" }}>
                Drive More Customers <br /> Through Digital.
              </h1>

              <p
                className="mb-4"
                style={{
                  color: "rgb(106, 134, 149)",
                  fontSize: "16",
                  fontWeight: "400",
                  lineHeight: "26px",
                  filter: "blur(0.2px)",
                }}
              >
                We provide marketing services to startups and small businesses
                looking for a partner in digital media, design & development,
                lead generation and communications requirements.
              </p>

              <div className="d-flex justify-content-center justify-content-lg-start gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-lg rounded-pill px-4"
                  style={{
                    backgroundColor: "#00c99c",
                    color: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 201, 156, 0.5)",
                  }}
                >
                  Get Started
                </button>

                <button
                  type="button"
                  className="btn rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#f42267",
                    width: "50px",
                    height: "50px",
                    boxShadow: "0px 4px 10px rgba(244, 34, 103, 1)",
                  }}
                >
                  <i className="fa-solid fa-play text-white"></i>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <img
                src={image1}
                alt="Digital Marketing"
                className="img-fluid"
                style={{ maxHeight: "380px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <PromoSection />

      <div className="container-fluid" style={{ backgroundColor: "#f6f7ff" }}>
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Text Content */}
            <div className="col-md-6 mb-4 mb-md-0">
              <span
                className="text-uppercase"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6A8695",
                }}
              >
                Features
              </span>
              <h2
                className="mt-2 mb-4 fw-bold"
                style={{ color: "#263b5e", fontSize: "32", fontWeight: "600" }}
              >
                Revolutionize Your Online <br /> Business Today!
              </h2>
              <p
                className="mb-5"
                style={{
                  fontSize: "16px",
                  color: "#6A8695",
                  lineHeight: "26px",
                }}
              >
                Revolutionize your online business with innovative tools to
                boost efficiency and sales. Gain valuable insights through
                analytics and optimize your strategies for growth. Our scalable
                solutions empower businesses of all sizes to thrive in the
                digital space.
              </p>

              <div className="row g-4">
                {/* Feature 1 */}
                <div className="col-md-6 d-flex flex-column align-items-start">
                  <i className="fas fa-chart-bar text-danger fs-2 mb-3"></i>
                  <h5 style={{ fontWeight: "600" }}>Digital Data Analysis</h5>
                  <p
                    style={{
                      lineHeight: "26px",
                      fontSize: "16px",
                      color: "#6a8695",
                    }}
                  >
                    IDWT offers expert Digital Data Analysis to help you unlock
                    the power of your data. Make informed decisions with
                    insights tailored to drive growth and optimize performance.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="col-md-6 d-flex flex-column align-items-start">
                  <i className="fas fa-coins text-success fs-2 mb-3"></i>
                  <h5 style={{ fontWeight: "600" }}>Marketing Automation</h5>
                  <p
                    style={{
                      lineHeight: "26px",
                      fontSize: "16px",
                      color: "#6a8695",
                    }}
                  >
                    Streamline your campaigns with IDWT's Marketing Automation
                    solutions. We help you save time, nurture leads, and drive
                    conversions with smart, automated workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="col-md-6 text-center">
              <img
                src={image2}
                alt="Feature Illustration"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Image Section */}
            <div className="col-md-6 mb-4 mb-md-0 text-center">
              <img
                src={image3}
                alt="Project Management"
                className="img-fluid rounded"
              />
            </div>

            {/* Text & Features Section */}
            <div className="col-md-6">
              <span
                className="text-uppercase"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6A8695",
                }}
              >
                Features
              </span>
             <h2
                className="mt-2 mb-4 fw-bold"
                style={{ color: "#263b5e", fontSize: "32", fontWeight: "600" }}
              >
                Track Productivity & Keep Your Projects On The Budget!
              </h2>
              <p className="mb-5"  style={{
                      lineHeight: "26px",
                      fontSize: "16px",
                      color: "#6a8695",
                    }}>
                Stay on track and within budget with our powerful project
                management tools. Monitor tasks, deadlines, and expenses in real
                time while collaborating seamlessly with your team. Generate
                custom reports to gain valuable insights and achieve your goals
                efficiently.
              </p>

              <div className="row g-4">
                {/* Feature 1 */}
                <div className="col-md-6 d-flex flex-column align-items-start">
                  <i className="sb sb-network text-warning fs-2 mb-3"></i>
                   <h5 style={{ fontWeight: "600" }}>Reporting & Analysis</h5>
                  <p  style={{
                      lineHeight: "26px",
                      fontSize: "16px",
                      color: "#6a8695",
                    }}>
                    Unlock actionable insights with our advanced reporting and
                    analysis tools. Make data-driven decisions to enhance
                    performance and drive business success.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="col-md-6 d-flex flex-column align-items-start">
                  <i className="sb sb-target text-primary fs-2 mb-3"></i>
                   <h5 style={{ fontWeight: "600" }}></h5>
                  <p  style={{
                      lineHeight: "26px",
                      fontSize: "16px",
                      color: "#6a8695",
                    }}>
                    Ensure your website’s performance with IDWT’s comprehensive
                    Technical SEO Audit. We improve search engine rankings and
                    enhance user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Services
        spanText="READY TO GROW"
        heading="Our Services"
        paragraph="We provide cutting-edge web technology services, including design, development, and optimization."
        buttonText="Learn More"
        bgColor="#151948"
      />

      <Testimonial />

     <div
  className="container-fluid py-5 cta-section"
  style={{ backgroundColor: "#151948" }}
>
  <div className="container">
    <div className="row align-items-center gy-4">

      {/* Left Content */}
      <div className="col-md-6 text-white cta-left">
        <h2 className="mb-3">Get In Touch</h2>
        <p className="mb-0">
          Get in touch with us to bring your ideas to life with
          cutting-edge technology solutions. Let's create something
          extraordinary together.
        </p>
      </div>

      {/* Right Button */}
      <div className="col-md-6 d-flex justify-content-md-end justify-content-start cta-right">
        <button
          type="button"
          className="btn btn-lg rounded-pill px-4"
          style={{
            backgroundColor: "#00c99c",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Chat With Us
        </button>
      </div>

    </div>
  </div>
</div>


      <Technologies />
    </>
  );
};

export default Home;
