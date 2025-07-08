import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.jsx";

export default function ChangeRates() {
  const navigate = useNavigate();
  const { fuelPrices, updateFuelPrices } = useContext(AppContext);
  const [rates, setRates] = useState({
    "petrol normal": fuelPrices["petrol normal"] || 94.5,
    "petrol turbo": fuelPrices["petrol turbo"] || 102.3,
    "diesel normal": fuelPrices["diesel normal"] || 90.7,
    "diesel turbo": fuelPrices["diesel turbo"] || 95.0,
  });
  const [isMidnightRedirect, setIsMidnightRedirect] = useState(false);

  useEffect(() => {
    // Check if it's after midnight (between 12AM and 1AM)
    const now = new Date();
    const hours = now.getHours();
    setIsMidnightRedirect(hours >= 0 && hours < 1);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRates((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the changes message
    const changes = [];
    for (const [fuelType, price] of Object.entries(rates)) {
      const originalPrice = fuelPrices[fuelType] || 0;
      if (price !== originalPrice) {
        changes.push(`${fuelType}: ${originalPrice} → ${price}`);
      }
    }

    // Update the context with new rates
    updateFuelPrices(rates);

    if (changes.length > 0) {
      alert(
        `You've updated the following rates:\n\n${changes.join("\n")}\n
        ----------------------------
        \nNew rates have been saved.
        \n${Object.entries(rates)
          .map(([fuelType, price]) => `${fuelType}: → ${price}`)
          .join("\n")}`
      );
      setTimeout(() => navigate(ROUTES.LOGIN), 300);
    } else {
      alert("No changes were made to the fuel rates.");
    }

    // If this was a midnight redirect, mark it as handled
    if (isMidnightRedirect) {
      setIsMidnightRedirect(false);
    }
  };

  return (
    <div className="container">
      <Header title="Welcome" />

      <h2 className="change-rates-title">Do you want to change the rates?</h2>

      {isMidnightRedirect && (
        <div className="notification">
          Note: It's after midnight - fuel prices have been reset for the new
          day.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Petrol normal</label>
          <input
            type="number"
            step="0.01"
            name="petrol normal"
            value={rates["petrol normal"]}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Petrol turbo</label>
          <input
            type="number"
            step="0.01"
            name="petrol turbo"
            value={rates["petrol turbo"]}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Diesel normal</label>
          <input
            type="number"
            step="0.01"
            name="diesel normal"
            value={rates["diesel normal"]}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Diesel turbo</label>
          <input
            type="number"
            step="0.01"
            name="diesel turbo"
            value={rates["diesel turbo"]}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit/Okay
        </button>
      </form>
    </div>
  );
}
