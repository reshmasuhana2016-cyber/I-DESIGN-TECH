import InnerHero from '../components/InnerHero.js'
import PromoSection from '../components/PromoSection.js';
import Technologies from '../components/Technologies.js';
import Testimonial from '../components/Testimonial.js';
import image9 from "../images/image9.png";
import FloatingShapes from '../components/FloatingShapes.js';


const AboutUs = () => {
  return (
   <>
      <InnerHero
  title="I DESIGN WEB TECHNOLOGIES"
  subtitle="Your Idea! Our Design"
/>

<FloatingShapes  />

      <PromoSection />

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            
            {/* Content Section */}
            <div className="col-lg-6 col-md-12">
              <span className=" fw-semibold d-block mb-2" style={{fontSize: "16px", fontWeight: "600", color: "#6a8695"}}>
                The Ultimate IT Solution For Your Company
              </span>

              <h2 className="fw-bold mb-3" style={{lineHeight: "42px", color: "#263b5e", fontSize: "30px"}}>
                iDESIGN WEB TECHNOLOGIES (iDWT)
              </h2>

              <p className="text-muted lh-lg" style={{color: "#6a8695;"}}>
                In today's fast-paced, technology-driven world, businesses need
                robust, reliable IT solutions to stay competitive. Whether you're
                a small startup or a large enterprise, implementing the right IT
                systems can streamline operations, improve productivity, and
                enhance security. Here’s a guide to help you identify the
                ultimate IT solution for your company.
              </p>
            </div>

            {/* Image Section */}
            <div className="col-lg-6 col-md-12 text-center">
              <img
                src={image9}
                alt="IT Services"
                className="img-fluid rounded"
              />
            </div>

          </div>
        </div>
      </div>

      <Testimonial />
      <Technologies />
    </>
  )
}

export default AboutUs
