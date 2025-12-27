import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import StoreContext from "../context/StoreContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, logout, user, } = useContext(StoreContext);

  // const handleSignUp = () => {
  //   navigate("/login")
  // }

  // const handleLogin = () => {
  //   navigate("/dashboard")
  // }

  const handleLogout = () => {
    logout();
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm"
      style={{ height: 70 }}
    >
      <div className="container-fluid d-flex align-items-center">
        {/* ⭐ NAV LOGO SECTION */}
        <Link
          to="/dashboard"
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={logo} // change path if needed
            alt="Logo"
            style={{ height: 45, width: "auto" }}
            className="me-2"
          />
          <span className="fw-bold">IDWT - ADMIN</span>
        </Link>

        {/* Hamburger for mobile */}
        {/* <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

         {/* <li className="nav-item me-3">
              <span className="nav-link text-white fw-semibold d-flex align-items-center">
                👋 Hi, <span className="ms-1">Admin</span>
              </span>
            </li> */}


        
       <div className="collapse navbar-collapse" id="navbarContent">
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

    {/* Show ONLY when user is NOT logged in */}
    {!isAuthenticated && (
      <>
        <li className="nav-item me-2">
          <Link to="/login" className="btn btn-success btn-sm">
            Login
          </Link>
        </li>

        <li className="nav-item me-2">
          <Link to="/signup" className="btn btn-primary btn-sm">
            Sign Up
          </Link>
        </li>
      </>
    )}

    {/* Show ONLY when user IS logged in */}
    {/* Show logout only when logged in AND screen is large (desktop) */}
{isAuthenticated && (
  <>
   <li className="nav-item me-3">
      <span className="nav-link text-white fw-semibold">
        👋 Hi, {user?.name}
      </span>
    </li>

    <li className="nav-item d-none d-lg-block">
    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
  </li>
  
  </>
  
)}


  </ul>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
