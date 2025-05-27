import React from "react";

const FormInput = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div
      style={{
        marginBottom: "15px",
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <label
        style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "70%",
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default FormInput;
