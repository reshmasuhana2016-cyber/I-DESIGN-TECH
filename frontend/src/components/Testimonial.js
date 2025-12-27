import "bootstrap/dist/css/bootstrap.min.css";
import image3 from "../images/image3.png";
import image4 from "../images/image4.png";
import image5 from "../images/image5.png";
import image6 from "../images/image6.png";
import image7 from "../images/image7.png";
import { useState, useEffect } from "react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/testimonial/gettestimonial`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const json = await response.json();

      // ✅ FIX IS HERE
      setTestimonials(json.data || []);

    } catch (error) {
      console.error("Error fetching Testimonial:", error);
    }
  };

  fetchTestimonials();
}, []);


  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f6f7ff" }}
    >
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT – Image Grid */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="image-grid">
              {[image3, image4, image5, image6, image7].map((img, index) => (
                <div key={index} className={`img-card card-${index + 1}`}>
                  <img src={img} alt="client" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – Testimonial Carousel */}
          <div className="col-md-6">
            <span
              className="text-uppercase"
              style={{ fontSize: "12px", fontWeight: "700", color: "#263b5e" }}
            >
              Testimonial
            </span>

            <h2
              className="mt-2 mb-4 fw-bold"
              style={{ color: "#263b5e", fontSize: "32px" }}
            >
              What Our Customers <br /> Say About Us!
            </h2>

            {testimonials.length > 0 && (
              <div
                id="testimonialCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {testimonials.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`carousel-item ${
                        index === 0 ? "active" : ""
                      }`}
                    >
                      <div className="testimonial-box py-4">
                        <p
                          style={{
                            lineHeight: "26px",
                            fontSize: "16px",
                            color: "#6a8695",
                          }}
                        >
                          “{item.description}”
                        </p>

                        <div className="d-flex align-items-center gap-3 mt-3">
                          <img
                           src={`${process.env.REACT_APP_API_URI}/${item.image}`}
                            
                            alt={item.name}
                            className="rounded-circle"
                            width="70"
                            height="70"
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{item.name}</h6>
                            <small className="text-muted">
                              {item.company}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#testimonialCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
