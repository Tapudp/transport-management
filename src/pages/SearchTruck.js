import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ROUTES } from "../constants/routes";
import { TextField, MenuItem, Box, Typography } from "@mui/material";

// Mock data - in a real app this would come from your backend/context
const FUEL_PRICES = {
  "petrol normal": 94.49,
  "petrol turbo": 98.8,
  "diesel normal": 90.17,
  "diesel turbo": 95.2,
};

// Mock truck data - replace with your actual data source
const TRUCK_DATA = [
  { state: "GJ", district: "01", series: "N", number: "8571" },
  { state: "MH", district: "02", series: "P", number: "1234" },
  { state: "DL", district: "03", series: "Q", number: "5678" },
  { state: "KA", district: "04", series: "R", number: "9012" },
];

const SearchTruck = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [filteredTrucks, setFilteredTrucks] = useState([]);
  const [fuelType, setFuelType] = useState("");
  const [liters, setLiters] = useState(0);
  const [amount, setAmount] = useState(0);
  const [activeField, setActiveField] = useState(null);

  // Filter trucks based on search term (last 4 digits)
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

  // Calculate amount when liters changes
  useEffect(() => {
    if (
      activeField === "liters" &&
      liters &&
      fuelType &&
      FUEL_PRICES[fuelType]
    ) {
      const calculatedAmount = (
        parseFloat(liters) * FUEL_PRICES[fuelType]
      ).toFixed(2);
      setAmount(calculatedAmount);
    }
  }, [liters, fuelType, activeField]);

  // Calculate liters when amount changes
  useEffect(() => {
    if (
      activeField === "amount" &&
      amount &&
      fuelType &&
      FUEL_PRICES[fuelType]
    ) {
      const calculatedLiters = (
        parseFloat(amount) / FUEL_PRICES[fuelType]
      ).toFixed(2);
      setLiters(calculatedLiters);
    }
  }, [amount, fuelType, activeField]);

  const handleTruckSelect = (truck) => {
    setSelectedTruck(truck);
    setSearchTerm(truck.number);
    setFilteredTrucks([]);
  };

  const handleSubmit = () => {
    // Submit logic here
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

        {/* Display selected truck (disabled fields) */}
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
            {Object.keys(FUEL_PRICES).map((fuel) => (
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
            value={
              liters.length > 1 && liters[0] === 0 ? liters.slice(1) : liters
            }
            onChange={(e) => {
              setLiters((p) =>
                p[0] === 0 ? p[0].slice(1) : parseFloat(e.target.value)
              );
              setActiveField("liters");
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: activeField === "liters" ? "#2196F3" : undefined,
              },
            }}
            onBlur={(e) => {}}
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
              let result = 0;
              if (e.target.value !== "0" && e.target.value[0] === "0") {
                result = e.target.value.slice(1);
              }
              setAmount(parseFloat(result));
              setActiveField("amount");
            }}
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
