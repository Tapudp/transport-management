import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TransporterCard from "../components/TransporterCard";
import { ROUTES } from "../constants/routes";

const TotalCredit = () => {
  const navigate = useNavigate();
  const { transporters } = useContext(AppContext);

  return (
    <div className="container">
      <Header title="Total Credit" />

      <div style={{ margin: "20px 0" }}>
        <h2>Transporters</h2>
        <div style={{ overflowY: "auto", height: "60vh", paddingTop: "10px" }}>
          {transporters.map((transporter) => (
            <TransporterCard
              key={transporter.panNumber}
              transporter={transporter}
              onClick={() =>
                navigate(ROUTES.VIEW_TRANSPORTER, {
                  state: { panNumber: transporter.panNumber },
                })
              }
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate(ROUTES.ADD_TRANSPORTER)}
        style={{ marginTop: "20px" }}
      >
        Add New Transporter
      </button>

      <Footer />
    </div>
  );
};

export default TotalCredit;
