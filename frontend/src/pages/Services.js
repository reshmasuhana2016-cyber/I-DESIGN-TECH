import { useEffect, useState } from "react";
import image11 from "../images/image11.png";
import { Link } from "react-router-dom";
import InnerHero from "../components/InnerHero";
import Technologies from "../components/Technologies";
import FloatingShapes from "../components/FloatingShapes";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URI}/api/services/getservices`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const json = await response.json();
        setServices(json.data || json); // adjust based on API response
      } catch (err) {
        console.error(err);
        setError("Unable to load services");
      } 
    };

    fetchServices();
  }, []);

  return (
    <>
      <InnerHero title="Our Services" subtitle="To Fulfill Your Dreams..." />

      <FloatingShapes  />

      <div className="container py-5">
        {loading && <p className="text-center"></p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={service._id || index}>
              <div className="service-card horizontal-card">
                {/* Image */}
                <div className="service-img">
                  {/* src={`${process.env.REACT_APP_API_URI}/${service.image}`} */}
                 <img
  src={`${process.env.REACT_APP_API_URI}/${service.images?.[0]}`}
  alt={service.longname}
/>
                </div>

                {/* Content */}
                <div className="service-content">
                  <span className="service-short">{service.shortname}</span>

                  <h5 className="service-long">{service.longname}</h5>
                </div>

                {/* Arrow Button */}
                <Link to={`/services/${service._id}`} className="service-btn">
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Technologies />
    </>
  );
};

export default ServicesSection;
