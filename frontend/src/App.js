import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AboutCompany from "./pages/AboutCompany";
// import WebDesigning from "./pages/WebDesigning";

import ServiceDetails from "./components/ServiceDetails";

function App() {
  return (
    <>
      {/* Always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Services Listing */}
        <Route path="/services" element={<Services />} />

        {/* Dynamic Service Details */}
        <Route path="/services/:id" element={<ServiceDetails />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-company" element={<AboutCompany />} />

        {/* Optional static page (can be removed later) */}
        {/* <Route path="/webdesigning" element={<WebDesigning />} /> */}
      </Routes>

      {/* Always visible */}
      <Footer />
    </>
  );
}

export default App;
