import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InnerHero from "../components/InnerHero";
import customServiceContent from "./CustomServiceContent.js";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URI}/api/services/getservices`
      );
      const data = await res.json();
      const services = data.data || data;
      setService(services.find((item) => item._id === id));
    };

    fetchService();
  }, [id]);

  const renderContent = (item, index) => {
    switch (item.type) {
      case "h2":
        return (
          <h2 key={index} className="content-title">
            {item.text}
          </h2>
        );

      case "h3":
        return (
          <h3 key={index} className="content-subtitle">
            {item.text}
          </h3>
        );

      case "h4":
        return (
          <h4 key={index} className="content-subheading">
            {item.text}
          </h4>
        );

      case "p":
        return (
          <p key={index} className="content-paragraph">
            {item.text}
          </p>
        );

      case "strong":
        return (
          <p key={index} className="content-highlight">
            {item.text}
          </p>
        );

      case "li":
        return (
          <div key={index} className="content-list-item">
            {item.text}
          </div>
        );

      default:
        return null;
    }
  };

  if (!service) return <p className="text-center py-5">Loading...</p>;

  const extraContent = customServiceContent?.[service?.shortname];

  return (
    <>
      <InnerHero title={service.longname} subtitle={service.shortname} />

      <div className="container py-5 service-details">
        <div className="row g-4 align-items-start">

          {/* LEFT: IMAGE CAROUSEL */}
          <div className="col-lg-8">
            <div className="rounded-4 overflow-hidden">
              <div
                id="serviceCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {service.images?.map((img, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URI}/${img}`}
                        className="w-100 service-carousel-img"
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                {service.images?.length > 1 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#serviceCarousel"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" />
                    </button>

                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#serviceCarousel"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: SERVICE INFO */}
          <div className="col-lg-4">
            <div className="service-info">
              <h3 className="fw-bold mb-3">{service.longname}</h3>

              <p className="content-paragraph">
                {service.description}
              </p>

              {service.video && (
                <a
                  href={service.video}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-primary w-100 mb-3"
                >
                  ▶ Watch Service Video
                </a>
              )}

              {service.brochure && (
                <a
                  href={`${process.env.REACT_APP_API_URI}/${service.brochure}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary w-100"
                >
                  Download Brochure
                </a>
              )}
            </div>
          </div>
        </div>

        {/* TEXT CONTENT SECTION */}
        {extraContent?.content && (
          <div className="service-content-section mt-5">
            {extraContent.content.map((item, index) =>
              renderContent(item, index)
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ServiceDetails;
