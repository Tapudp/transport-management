import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = ({ title, onBack }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#25D366" }}>
      <Toolbar>
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
