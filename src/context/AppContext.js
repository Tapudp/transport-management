import { createContext, useEffect, useState } from "react";
import transactionsData from "../data/transactions.json";
import transportersData from "../data/transporters.json";

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

  const updateTransporter = (updatedTransporter) => {
    setTransporters((prev) =>
      prev.map((t) =>
        t.panNumber === updatedTransporter.panNumber ? updatedTransporter : t
      )
    );
  };

  const deleteTransporter = (panNumber) => {
    setTransporters((prev) => prev.filter((t) => t.panNumber !== panNumber));
  };

  const toggleHotlist = (panNumber) => {
    setTransporters((prev) =>
      prev.map((t) =>
        t.panNumber === panNumber ? { ...t, isHotlisted: !t.isHotlisted } : t
      )
    );
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
        updateTransporter,
        deleteTransporter,
        toggleHotlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
