import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";

const SearchTruck = () => {
  const navigate = useNavigate();
  const [truckNumber, setTruckNumber] = useState({
    state: "GJ",
    district: "01",
    series: "N",
    number: "8571",
  });
  const [fuelType, setFuelType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    // Submit logic here
    navigate("/total-credit");
  };

  return (
    <div className="container">
      <Header
        title="Welcome"
        onHome={() => {
          navigate("/");
        }}
      />

      <div style={{ margin: "20px 0" }}>
        <h2>Search for Truck</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "15px",
          }}
        >
          <input
            type="text"
            value={truckNumber.state}
            onChange={(e) =>
              setTruckNumber({ ...truckNumber, state: e.target.value })
            }
            style={{ width: "50px", padding: "8px" }}
          />
          <input
            type="text"
            value={truckNumber.district}
            onChange={(e) =>
              setTruckNumber({ ...truckNumber, district: e.target.value })
            }
            style={{ width: "50px", padding: "8px" }}
          />
          <input
            type="text"
            value={truckNumber.series}
            onChange={(e) =>
              setTruckNumber({ ...truckNumber, series: e.target.value })
            }
            style={{ width: "30px", padding: "8px" }}
          />
          <input
            type="text"
            value={truckNumber.number}
            onChange={(e) =>
              setTruckNumber({ ...truckNumber, number: e.target.value })
            }
            style={{ width: "80px", padding: "8px" }}
          />
        </div>

        <FormInput
          label="Select Fuel"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          placeholder="Enter fuel type"
        />

        <FormInput
          label="Enter Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Submit
        </button>

        <button
          style={{
            marginTop: "10px",
            backgroundColor: "#2196F3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Scan QR
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SearchTruck;
