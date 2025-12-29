import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useState, useEffect } from "react";

const Technologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/technologies/gettechnologies`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Technologies");
        }

        const json = await response.json();

        // API may return { data: [...] }
        const techArray = Array.isArray(json) ? json : json.data;

        setTechnologies(techArray || []);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading technologies...</div>;
  }

  if (technologies.length === 0) {
    return <div className="text-center py-5">No technologies found</div>;
  }

  return (
    <div className="container text-center py-5">
      <span className="text-uppercase text-muted" style={{color: "#263b5e"}}>IDWT</span>
      <h2 className="mb-4" style={{color: "#263b5e", fontWeight: "700"}}>Technologies We Use</h2>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={5}
        spaceBetween={30}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
        }}
      >
        {technologies.map((tech) => (
          <SwiperSlide key={tech._id}>
            <img
      src={`${process.env.REACT_APP_API_URL}/${tech.image}`}
      alt="Technology"
      className="img-fluid tech-logo"
    />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Technologies;
