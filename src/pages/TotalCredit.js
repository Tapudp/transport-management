import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TransporterCard from "../components/TransporterCard";

const TotalCredit = () => {
  const navigate = useNavigate();
  const transporters = [
    { name: "Jonathan Patterson", amount: 200000 },
    { name: "Shiv shakti Transport ...", amount: 200000 },
    { name: "dr. Jonathan Patterson", amount: 200000 },
    { name: "dr. Jonathan Patterson", amount: 0 },
  ];

  return (
    <div className="container">
      <Header title="Total Credit" />

      <div style={{ margin: "20px 0" }}>
        <h2>Add Transporter</h2>
        <h3>Transporters</h3>

        {transporters.map((transporter) => (
          <TransporterCard key={transporter.id} transporter={transporter} />
        ))}
      </div>

      <button
        onClick={() => navigate("/add-transporter")}
        style={{ marginTop: "20px" }}
      >
        Add New Transporter
      </button>

      <Footer />
    </div>
  );
};

export default TotalCredit;
