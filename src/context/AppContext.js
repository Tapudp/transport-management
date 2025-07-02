import { createContext, useEffect, useState } from "react";
import transactionsData from "../data/transactions.json";
import transportersData from "../data/transporters.json";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [fuelPrices, setFuelPrices] = useState({
    "petrol normal": 94.49,
    "petrol turbo": 98.8,
    "diesel normal": 90.17,
    "diesel turbo": 95.2,
  });
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

  // Method to update fuel prices
  const updateFuelPrices = (newPrices) => {
    setFuelPrices((prev) => ({
      ...prev,
      ...newPrices,
    }));

    // In a real app, you would also save to backend here
    // For now, we'll just log it
    console.log("Fuel prices updated:", newPrices);
  };

  // Method to check if prices have been updated today
  const arePricesUpdatedToday = () => {
    // You might want to implement this later with actual date tracking
    return true; // Temporary implementation
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
        fuelPrices,
        updateFuelPrices,
        arePricesUpdatedToday,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
