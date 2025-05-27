import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ViewTransporter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transporter } = location.state || {};

  // Sample data - in a real app, this would come from an API
  const transactionHistory = [
    { id: 1, date: "2023-05-15", description: "Fuel Advance", amount: -50000 },
    { id: 2, date: "2023-05-10", description: "Trip Payment", amount: 200000 },
    {
      id: 3,
      date: "2023-05-05",
      description: "Maintenance Advance",
      amount: -50000,
    },
    { id: 4, date: "2023-05-01", description: "Trip Payment", amount: 50000 },
  ];

  // Calculate current balance (in a real app, this would come from the API)
  const currentBalance = transporter?.amount || 0;

  return (
    <div className="container">
      <Header
        title={`Transporter Details`}
        onBack={() => navigate("/total-credit")}
        onHome={() => {
          navigate("/");
        }}
      />

      <div style={{ margin: "20px 0" }}>
        <Typography variant="h5" gutterBottom>
          {transporter?.name || "Transporter"}
        </Typography>

        <Paper
          elevation={3}
          style={{
            padding: "15px",
            marginBottom: "20px",
            backgroundColor: currentBalance < 0 ? "#ffebee" : "#e8f5e9",
          }}
        >
          <Typography variant="h6">Current Balance:</Typography>
          <Typography
            variant="h4"
            style={{
              color: currentBalance < 0 ? "#d32f2f" : "#2e7d32",
              fontWeight: "bold",
            }}
          >
            ₹{Math.abs(currentBalance).toLocaleString("en-IN")}/-
            {currentBalance < 0 ? " (Pending)" : " (Available)"}
          </Typography>
        </Paper>

        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Transaction History
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount (₹)</TableCell>
                {/* <TableCell align="right">Balance (₹)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionHistory.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: transaction.amount < 0 ? "#d32f2f" : "#2e7d32",
                    }}
                  >
                    {transaction.amount.toLocaleString("en-IN")}
                  </TableCell>
                  {/* <TableCell align="right">
                    {transaction.balance.toLocaleString('en-IN')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footer />
    </div>
  );
};

export default ViewTransporter;
