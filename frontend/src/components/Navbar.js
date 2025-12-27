import { useState } from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const getNavClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "white", height: "80px" }}
    >
      <div className="container">

        {/* Logo */}
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "100px", marginTop: "30px" }}
          />
        </NavLink>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className={`collapse navbar-collapse pt-4 ${
            isOpen ? "show" : ""
          }`}
        >
          <ul
            className="navbar-nav gap-4 ms-auto mb-2 mb-lg-0"
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "rgb(98, 45, 250)",
            }}
          >
            {/* HOME */}
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={getNavClass}
                end
              >
                HOME
              </NavLink>
            </li>

            {/* ABOUT Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link bg-transparent border-0"
                data-bs-toggle="dropdown"
                type="button"
              >
                ABOUT
              </button>

              <ul className="dropdown-menu border-0">
                <li>
                  <NavLink
                    to="/about-us"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/about-company"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive ? "dropdown-item active" : "dropdown-item"
                    }
                  >
                    About Company
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* SERVICES */}
            <li className="nav-item">
              <NavLink
                to="/services"
                onClick={closeMenu}
                className={getNavClass}
              >
                SERVICES
              </NavLink>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={getNavClass}
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
