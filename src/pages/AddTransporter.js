import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";
import Header from "../components/Header";
import { ROUTES } from "../constants/routes";
import { AppContext } from "../context/AppContext";

const AddTransporter = () => {
  const navigate = useNavigate();
  const { addTransporter, updateTransporter } = useContext(AppContext);
  const [currentTruck, setCurrentTruck] = useState({
    stateCode: "",
    districtCode: "",
    series: "",
    number: "",
  });

  const location = useLocation();
  const { editTransporter } = location.state || {};

  const [formData, setFormData] = useState(
    editTransporter || {
      firmName: "",
      ownerName: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      panNumber: "",
      trucks: [],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTruckChange = (e) => {
    const { name, value } = e.target;
    setCurrentTruck((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTruck = () => {
    if (
      currentTruck.stateCode &&
      currentTruck.districtCode &&
      currentTruck.series &&
      currentTruck.number
    ) {
      const truckNumber = `${currentTruck.stateCode}${currentTruck.districtCode}${currentTruck.series}${currentTruck.number}`;
      setFormData((prev) => ({
        ...prev,
        trucks: [...prev.trucks, { truckNumber }],
      }));
      setCurrentTruck({
        stateCode: "",
        districtCode: "",
        series: "",
        number: "",
      });
    }
  };

  const removeTruck = (index) => {
    setFormData((prev) => ({
      ...prev,
      trucks: prev.trucks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firmName || !formData.mobile || !formData.panNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const transporterData = {
      ...formData,
      mobile: formData.mobile.toString(),
      pinCode: formData.pinCode.toString(),
    };

    if (editTransporter) {
      updateTransporter(transporterData);
    } else {
      addTransporter(transporterData);
    }

    navigate(ROUTES.TOTAL_CREDIT);
  };

  return (
    <div className="container">
      <Header
        title="Add Transporter"
        onBack={() => navigate(ROUTES.TOTAL_CREDIT)}
      />

      <form
        onSubmit={handleSubmit}
        style={{ margin: "20px 0", height: "80vh", overflowY: "scroll" }}
      >
        <h2>Add New Transporter</h2>

        {/* Business Information Section */}
        <div
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
            paddingX: "10px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Business Information</h3>

          <FormInput
            label="Firm Name *"
            name="firmName"
            value={formData.firmName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Owner Name *"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="PAN Number *"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Information Section */}
        <div
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
            paddingX: "10px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Contact Information</h3>

          <FormInput
            label="Mobile Number *"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />

          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <FormInput
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <FormInput
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <FormInput
            label="Pin Code"
            name="pinCode"
            type="number"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>

        {/* Truck Information Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "15px" }}>Truck Information</h3>

          <div style={{ margin: "15px 0" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Add Trucks:
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "10px",
              }}
            >
              {/* State Code (2 letters) */}
              <input
                type="text"
                name="stateCode"
                placeholder="GJ"
                value={currentTruck.stateCode}
                onChange={handleTruckChange}
                maxLength={2}
                pattern="[A-Za-z]{2}"
                title="Enter 2-letter state code"
                style={{
                  width: "50px",
                  padding: "8px",
                  textTransform: "uppercase",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^A-Za-z]/g, "")
                    .toUpperCase();
                }}
              />

              {/* District Code (2 digits) */}
              <input
                type="text"
                name="districtCode"
                placeholder="01"
                value={currentTruck.districtCode}
                onChange={handleTruckChange}
                maxLength={2}
                pattern="\d{2}"
                title="Enter 2-digit district code"
                style={{ width: "50px", padding: "8px" }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />

              {/* Series (1-3 letters) */}
              <input
                type="text"
                name="series"
                placeholder="N"
                value={currentTruck.series}
                onChange={handleTruckChange}
                maxLength={3}
                pattern="[A-Za-z]{1,3}"
                title="Enter 1-3 letter series"
                style={{
                  width: "50px",
                  padding: "8px",
                  textTransform: "uppercase",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^A-Za-z]/g, "")
                    .toUpperCase();
                }}
              />

              {/* Number (4 digits) */}
              <input
                type="text"
                name="number"
                placeholder="8571"
                value={currentTruck.number}
                onChange={handleTruckChange}
                maxLength={4}
                pattern="\d{4}"
                title="Enter 4-digit number"
                style={{ width: "80px", padding: "8px" }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />

              <button
                type="button"
                onClick={addTruck}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
                disabled={
                  currentTruck.stateCode.length !== 2 ||
                  currentTruck.districtCode.length !== 2 ||
                  currentTruck.series.length < 1 ||
                  currentTruck.number.length !== 4
                }
              >
                Add
              </button>
            </div>

            {/* Display added trucks */}
            {formData.trucks.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <p style={{ fontWeight: "500", marginBottom: "5px" }}>
                  Added Trucks:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {formData.trucks.map((truck, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#e0e0e0",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {truck.truckNumber}
                      <button
                        type="button"
                        onClick={() => removeTruck(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#f44336",
                          cursor: "pointer",
                          padding: "0",
                          fontSize: "12px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
          <button
            type="button"
            onClick={() => navigate(ROUTES.TOTAL_CREDIT)}
            style={{ backgroundColor: "#f44336" }}
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default AddTransporter;
