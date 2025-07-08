import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.jsx";

const Header = ({ title, onBack }) => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" style={{ backgroundColor: "#25D366" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => navigate(ROUTES.LOGIN)}
          aria-label="home"
          sx={{ mr: 2, width: "100px" }}
        >
          <HomeIcon />
        </IconButton>
        {onBack && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onBack}
            aria-label="back"
            sx={{ mr: 2, width: "100px" }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title || "Transport Management"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
