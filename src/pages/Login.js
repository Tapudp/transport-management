import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormInput from "../components/FormInput";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (mobileNumber.length === 10) {
      setShowOtpField(true);
    }
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      navigate("/total-credit");
    }
  };

  return (
    <div className="container">
      <Header
        title="Login"
        onHome={() => {
          navigate("/");
        }}
      />
      <div style={{ backgroundColor: "gray" }}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <h2>07:00</h2>
        </div>

        {!showOtpField ? (
          <>
            <FormInput
              label="Enter Mobile Number"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button onClick={handleContinue}>Continue</button>
          </>
        ) : (
          <div>
            <FormInput
              label="Enter Mobile OTP"
              type="number"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button disabled={true} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        <p
          style={{
            fontSize: "12px",
            color: "#666",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS
          messages, including by automated means, from organization and its
          affiliates to the number provided.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "25px",
        }}
      >
        {/* <button onClick={() => navigate("/login")}>Login</button> */}

        <button onClick={() => navigate("/total-credit")}>
          Transporter-view
        </button>

        <button onClick={() => navigate("/search-truck")}>
          PP Filler view
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
