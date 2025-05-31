import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TotalCredit from "./pages/TotalCredit";
import AddTransporter from "./pages/AddTransporter";
import ViewTransporter from "./pages/ViewTransporter";
import SearchTruck from "./pages/SearchTruck";
import NotFound from "./pages/NotFound";
import { ROUTES } from "./constants/routes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.TOTAL_CREDIT} element={<TotalCredit />} />
        <Route path={ROUTES.ADD_TRANSPORTER} element={<AddTransporter />} />
        <Route path={ROUTES.VIEW_TRANSPORTER} element={<ViewTransporter />} />
        <Route path={ROUTES.SEARCH_TRUCK} element={<SearchTruck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
