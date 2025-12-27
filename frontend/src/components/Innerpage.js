import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InnerHero from "./InnerHero";

const Innerpage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URI}/api/services/getservices`
        );

        const json = await res.json();
        const services = json.data || json;

        const found = services.find(item => item._id === id);
        setService(found);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (!service) return <p className="text-center">Service not found</p>;

  return (
    <>
      {/* HERO */}
      <InnerHero
        title={service.longname}
        subtitle={service.shortname}
      />

      {/* CAROUSEL */}
      {service.images?.length > 0 && (
        <div
          id="serviceCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {service.images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  style={{ height: "450px", objectFit: "cover" }}
                  alt=""
                />
              </div>
            ))}
          </div>

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
        </div>
      )}

      {/* CONTENT */}
      <div className="container py-5">
        <p>{service.description}</p>
      </div>
    </>
  );
};

export default Innerpage;
