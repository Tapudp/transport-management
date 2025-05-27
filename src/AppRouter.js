import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TotalCredit from "./pages/TotalCredit";
import AddTransporter from "./pages/AddTransporter";
import ViewTransporter from "./pages/ViewTransporter";
import SearchTruck from "./pages/SearchTruck";
import NotFound from "./pages/404NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/total-credit" element={<TotalCredit />} />
        <Route path="/add-transporter" element={<AddTransporter />} />
        <Route path="/view-transporter" element={<ViewTransporter />} />
        <Route path="/search-truck" element={<SearchTruck />} />
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
