import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SupportIcon from "@mui/icons-material/Support";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "10px 0 0 0",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate(ROUTES.LOGIN)}
        />
        {/* <BottomNavigationAction label="Support" icon={<SupportIcon />} />
        <BottomNavigationAction label="Reports" icon={<AssessmentIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} /> */}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
