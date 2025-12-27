import React from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Sidebar />

      {/* MAIN CONTENT */}
      <div
        className="p-4 dashboard-container"
        style={{
          background: "#f3f5fb",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <h3 className="fw-bold mb-4">Dashboard</h3>

        {/* Simple 3 Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-4 col-12">
            <div className="bg-white p-4 rounded-4 shadow-sm text-center">
              <h2 className="fw-bold m-0">120</h2>
              <p className="text-muted m-0">Visitors</p>
            </div>
          </div>

          <div className="col-md-4 col-12">
            <div className="bg-white p-4 rounded-4 shadow-sm text-center">
              <h2 className="fw-bold m-0">45</h2>
              <p className="text-muted m-0">Projects</p>
            </div>
          </div>

          <div className="col-md-4 col-12">
            <div className="bg-white p-4 rounded-4 shadow-sm text-center">
              <h2 className="fw-bold m-0">4.8⭐</h2>
              <p className="text-muted m-0">Rating</p>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}
