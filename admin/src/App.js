// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Dashboard from "./pages/Dashboard.js";
import SignUp from "./pages/SignUp.js";
import Login from "./pages/Login.js";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./routes/ProtectedRoute.js";
import PublicRoute from "./routes/PublicRoute.js";   // FIXED ✔
import Technology from "./pages/Technology.js"
import Testimonial from "./pages/Testimonial.js"
import Services  from "./pages/Services.js"
import Promo from "./pages/Promo.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>

          {/* Default path → protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Signup - Public */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Login - Public */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Dashboard - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/promo"
            element={
              <ProtectedRoute>
                <Promo />
              </ProtectedRoute>
            }
          />

         
           <Route
            path="/technology"
            element={
              <ProtectedRoute>
                <Technology />
              </ProtectedRoute>
            }
          />

           <Route
            path="/testimonial"
            element={
              <ProtectedRoute>
                <Testimonial />
              </ProtectedRoute>
            }
          />

           <Route
            path="/service"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />

          

        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
