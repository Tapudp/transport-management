import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
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
import { ROUTES } from "../constants/routes.jsx";

const ViewTransporter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    transporter: { panNumber },
  } = location.state || {};
  const { getTransporterByPan, getTransactionsByPan } = useContext(AppContext);

  const transporter = getTransporterByPan(panNumber);
  const transactions = getTransactionsByPan(panNumber);

  // Calculate current balance
  const currentBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Calculate running balance for each transaction
  let runningBalance = 0;
  const transactionsWithBalance = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((t) => {
      runningBalance += t.amount;
      return { ...t, balance: runningBalance };
    });

  if (!transporter) {
    return (
      <div className="container">
        <Header
          title="Transporter Not Found"
          onBack={() => navigate(ROUTES.TOTAL_CREDIT)}
        />
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Transporter not found
        </Typography>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Header
        title={`Transporter Details`}
        onBack={() => navigate(ROUTES.TOTAL_CREDIT)}
      />

      <div style={{ margin: "20px 0" }}>
        <Typography variant="h5" gutterBottom>
          {transporter.name}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          PAN: {transporter.panNumber}
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

        {/* <Typography variant="h6" gutterBottom>
          Trucks:
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {transporter.trucks.map((truck, index) => (
            <Paper key={index} elevation={2} style={{ padding: "8px 12px" }}>
              {truck.truckNumber}
            </Paper>
          ))}
        </div> */}

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
                <TableCell align="right">Balance (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsWithBalance.map((transaction) => (
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
                  <TableCell align="right">
                    {transaction.balance.toLocaleString("en-IN")}
                  </TableCell>
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
