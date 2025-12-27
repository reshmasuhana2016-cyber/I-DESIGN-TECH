import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../context/StoreContext";  // <-- Needed for logout

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(StoreContext);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="btn btn-dark d-md-none"
        style={{
          position: "fixed",
          top: "80px",
          left: "10px",
          zIndex: 2000,
        }}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 shadow ${open ? "open" : ""}`}
        style={{
          width: "200px",
          height: "100vh",
          position: "fixed",
          top: "70px",
          left: 0,
        }}
      >

        <ul className="nav nav-pills flex-column mb-auto">

          {/* Your links... */}
           <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link text-white d-flex align-items-center"
              onClick={closeSidebar}
            >
              <span className="me-2" style={{ fontSize: "20px" }}>📉</span>
              DASHBOARD
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/promo"
              className="nav-link text-white d-flex align-items-center"
              onClick={closeSidebar}
            >
              <span className="me-2" style={{ fontSize: "20px" }}>🎉</span>
              PROMOS
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/technology"
              className="nav-link text-white d-flex align-items-center"
              onClick={closeSidebar}
            >
              <span className="me-2" style={{ fontSize: "20px" }}>💻</span>
              TECHNOLOGY
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/testimonial"
              className="nav-link text-white d-flex align-items-center"
              onClick={closeSidebar}
            >
              <span className="me-2" style={{ fontSize: "20px" }}>⭐</span>
              TESTIMONIAL
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/service"
              className="nav-link text-white d-flex align-items-center"
              onClick={closeSidebar}
            >
              <span className="me-2" style={{ fontSize: "20px" }}>📦</span>
              SERVICE
            </Link>
          </li>

        </ul>

        {/* Mobile Logout (footer) */}
        <div className="mt-auto d-md-none">
          <button
            className="btn btn-danger w-100 mt-3"
            onClick={() => {
              logout();
              closeSidebar();
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
