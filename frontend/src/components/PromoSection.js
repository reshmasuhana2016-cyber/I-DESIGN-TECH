import { useEffect, useState } from "react";

const PromoSection = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        console.log("API URI:", process.env.REACT_APP_API_URL);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/promos/getpromos`
          // ⬆️ make sure this matches backend route
        );

        if (!response.ok) {
          throw new Error("Failed to fetch promos");
        }

        const result = await response.json();

        // backend returns { data: promos }
        setPromos(result.data || []);
      } catch (error) {
        console.error("Error fetching promos:", error);
      } finally {
        // ✅ MUST be here
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (promos.length === 0) {
    return <div className="text-center py-5">No promos found</div>;
  }

  return (
    <div className="container-fluid py-5 promo-bg" style={{height: "316px"}}>
      <div className="container">
        <div className="row g-4">
          {promos.map((promo) => (
            <div className="col-lg-3 col-md-6" key={promo._id}>
              <div className="service-card text-center">
                <span className={`bg-icon fa-solid ${promo.icon}`}></span>
                <i className={`fa-solid ${promo.icon} service-icon`}></i>
                <h5 className="mt-3">{promo.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
