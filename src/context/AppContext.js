import React, { createContext, useState, useEffect } from "react";
import transportersData from "../data/transporters.json";
import transactionsData from "../data/transactions.json";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transporters, setTransporters] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setTransporters(transportersData);
    setTransactions(transactionsData);
  }, []);

  const getTransporterByPan = (panNumber) => {
    return transporters.find((t) => t.panNumber === panNumber);
  };

  const getTransactionsByPan = (panNumber) => {
    return transactions.filter((t) => t.panNumber === panNumber);
  };

  const addTransporter = (newTransporter) => {
    setTransporters([...transporters, newTransporter]);
  };

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <AppContext.Provider
      value={{
        transporters,
        transactions,
        getTransporterByPan,
        getTransactionsByPan,
        addTransporter,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
