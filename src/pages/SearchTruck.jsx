import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { ROUTES } from "../constants/routes.jsx";
import { TextField, MenuItem, Box, Typography } from "@mui/material";
import { AppContext } from "../context/AppContext.jsx";

const TRUCK_DATA = [
  { state: "GJ", district: "01", series: "N", number: "8571" },
  { state: "MH", district: "02", series: "P", number: "1234" },
  { state: "DL", district: "03", series: "Q", number: "5678" },
  { state: "KA", district: "04", series: "R", number: "9012" },
];

const SearchTruck = () => {
  const { fuelPrices } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState(0); // Initialize as number 0
  const [amount, setAmount] = useState(0); // Initialize as number 0
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = TRUCK_DATA.filter((truck) =>
        truck.number.includes(searchTerm)
      );
      setFilteredTrucks(filtered);
    } else {
      setFilteredTrucks([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (activeField === "liters" && fuelType && fuelPrices[fuelType]) {
      const calculatedAmount = parseFloat(liters) * fuelPrices[fuelType];
      setAmount(
        isNaN(calculatedAmount) ? 0 : parseFloat(calculatedAmount.toFixed(2))
      );
    }
  }, [liters, fuelType, activeField]);

  useEffect(() => {
    if (activeField === "amount" && fuelType && fuelPrices[fuelType]) {
      const calculatedLiters = parseFloat(amount) / fuelPrices[fuelType];
      setLiters(
        isNaN(calculatedLiters) ? 0 : parseFloat(calculatedLiters.toFixed(2))
      );
    }
  }, [amount, fuelType, activeField]);

  const handleTruckSelect = (truck) => {
    setSelectedTruck(truck);
    setSearchTerm(truck.number);
    setFilteredTrucks([]);
  };

  const handleNumberChange = (value, setter) => {
    // Ensure we're always working with numbers
    const numValue = parseFloat(value) || 0;
    setter(numValue);
  };

  const handleSubmit = () => {
    navigate(ROUTES.TOTAL_CREDIT);
  };

  return (
    <div className="container">
      <Header title="Welcome" />

      <div style={{ margin: "20px 0" }}>
        <h2>Search for Truck</h2>

        {/* Searchable truck number field */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search by truck number"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter last 4 digits"
            inputProps={{ maxLength: 4 }}
          />
          {filteredTrucks.length > 0 && (
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                mt: 1,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {filteredTrucks.map((truck, index) => (
                <Box
                  key={index}
                  onClick={() => handleTruckSelect(truck)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {`${truck.state} ${truck.district} ${truck.series} ${truck.number}`}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Display selected truck */}
        {selectedTruck && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              mb: 3,
              backgroundColor: "#f9f9f9",
              p: 2,
              borderRadius: "4px",
            }}
          >
            <TextField
              disabled
              value={selectedTruck.state}
              sx={{ width: "60px" }}
            />
            <TextField
              disabled
              value={selectedTruck.district}
              sx={{ width: "60px" }}
            />
            <TextField
              disabled
              value={selectedTruck.series}
              sx={{ width: "50px" }}
            />
            <TextField
              disabled
              value={selectedTruck.number}
              sx={{ width: "80px" }}
            />
          </Box>
        )}

        {/* Fuel type selection */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Typography sx={{ minWidth: "100px" }}>Select Fuel</Typography>
          <TextField
            select
            fullWidth
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            sx={{ flex: 1 }}
          >
            {Object.keys(fuelPrices).map((fuel) => (
              <MenuItem key={fuel} value={fuel}>
                {fuel}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Liters input */}
        <Box sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label="Enter in Litre"
            type="number"
            value={liters}
            onChange={(e) => {
              handleNumberChange(e.target.value, setLiters);
              setActiveField("liters");
            }}
            inputProps={{ min: 0, step: 0.1 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: activeField === "liters" ? "#2196F3" : undefined,
              },
            }}
          />
        </Box>

        {/* OR separator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 1,
          }}
        >
          <Typography>OR</Typography>
        </Box>

        {/* Amount input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={(e) => {
              handleNumberChange(e.target.value, setAmount);
              setActiveField("amount");
            }}
            inputProps={{ min: 0, step: 0.1 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: activeField === "amount" ? "#2196F3" : undefined,
              },
            }}
          />
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Submit
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            Scan QR
          </button>
        </Box>
      </div>

      <Footer />
    </div>
  );
};

export default SearchTruck;
