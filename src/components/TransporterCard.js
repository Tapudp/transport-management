import React from "react";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const TransporterCard = ({ transporter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.VIEW_TRANSPORTER, { state: { transporter } });
  };

  return (
    <ButtonBase onClick={handleClick} style={{ width: "100%" }}>
      <Card sx={{ mb: 2, width: "100%" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {transporter.name}
          </Typography>
          <Typography color="text.secondary">
            PAN: {transporter.panNumber}
          </Typography>
          <Typography color="text.secondary">
            Mobile: {transporter.mobile}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default TransporterCard;
