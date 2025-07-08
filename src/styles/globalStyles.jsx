import { Global } from "@emotion/react";

const globalStyles = {
  "*": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    fontFamily: '"Roboto", sans-serif',
  },
  body: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    lineHeight: 1.6,
    fontSize: "16px",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  "#root": {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  ".container": {
    width: "100%",
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px",
    flex: 1,
  },
  "h1, h2, h3": {
    marginBottom: "1rem",
  },
  "input, select, button": {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#45a049",
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  "@media (min-width: 768px)": {
    body: {
      fontSize: "18px",
    },
    ".container": {
      maxWidth: "768px",
    },
  },
};

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
