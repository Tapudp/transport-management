import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label
        style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
      >
        {label}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        required={required}
        style={{
          width: "100%",
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
