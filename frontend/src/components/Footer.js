import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="text-white pt-5" style={{ backgroundColor: "#151948" }}>
      <div className="container">
        <div className="row gy-4">

          {/* Company Info */}
          <div className="col-lg-4 col-md-6 text-md-start text-center">
            <img src={logo} alt="iDWT Logo" style={{ width: "80px" }} />
            <p className="mt-3 small">
              iDESIGN WEB TECHNOLOGIES (iDWT) is a software company focusing on
              static and dynamic website development and highly reputed web
              technologies.
            </p>
          </div>

          {/* Links */}
          <div className="col-lg-3 col-md-6 text-md-start text-center">
            <h5 className="mb-3">Company</h5>
            <ul className="list-unstyled footer-links">
              <li>Web Development</li>
              <li>UI/UX Designing</li>
              <li>Mobile Applications</li>
              <li>IT Consulting</li>
              <li>Cloud & Infra</li>
              <li>Domains, Hosting</li>
              <li>Email</li>
              <li>Clients Reviews</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 text-md-start text-center">
            <h5 className="mb-3">Reach Us</h5>
            <p className="small mb-2">
              <strong>Reg :</strong> Gujjanagundla, Guntur
            </p>
            <p className="small mb-2">
              <strong>Working :</strong> Near Bhaskar Cinemas, Naaz Center, Guntur
            </p>
            <p className="small">
              <strong>Get In Touch :</strong><br />
              idwt365@gmail.com <br />
              +91-9652051213
            </p>
          </div>

          {/* Map & Social */}
          <div className="col-lg-2 col-md-6 text-center">
            <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3829.459175710123!2d80.4445077736819!3d16.299465933236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a75000da0bc4f%3A0x222f6fdae249ee32!2si%20DESIGN%20WEB%20TECHNOLOGIES!5e0!3m2!1sen!2sin!4v1735888154348!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ borderRadius: "8px", border: 0 }}
              loading="lazy"
              title="iDWT Location"
            ></iframe>

            <div className="d-flex justify-content-center  gap-2 mt-3">
              <a href="https://www.facebook.com/idwt.rams" className="social-icon bg-primary"><FaFacebookF /></a>
              <a href="https://x.com/IdwtRams365" className="social-icon bg-success"><FaTwitter /></a>
              <a href="https://www.youtube.com/@idesignwebtechnologies1180" className="social-icon bg-danger"><FaYoutube /></a>
              <a href="https://www.linkedin.com/in/i-desing-web-technologies-idwt-97475294/" className="social-icon bg-secondary"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/idwt365/" className="social-icon bg-info"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center py-3 mt-4 border-top border-secondary small">
          © 2025 Powered by iDWT
        </div>
      </div>
    </footer>
  );
};

export default Footer;
