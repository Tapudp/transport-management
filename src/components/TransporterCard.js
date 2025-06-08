import { Box, ButtonBase, Card, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const TransporterCard = ({ transporter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.VIEW_TRANSPORTER, { state: { transporter } });
  };

  const balance = transporter.balance || 0;

  return (
    <ButtonBase onClick={handleClick} style={{ width: "100%" }}>
      <Card
        sx={{
          mb: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left side - Transporter Info (70% width) */}
        <Box
          sx={{
            width: "70%",
            padding: "16px",
            overflow: "hidden",
            textAlign: "left",
          }}
        >
          <Tooltip title={transporter.firmName}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {transporter.firmName}
            </Typography>
          </Tooltip>
          <Tooltip title={transporter.ownerName}>
            <Typography
              color="text.secondary"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {transporter.ownerName}
            </Typography>
          </Tooltip>
        </Box>

        {/* Right side - Balance (30% width) */}
        <Box
          sx={{
            width: "30%",
            padding: "16px",
            textAlign: "right",
            minWidth: "120px", // Ensure enough space for balance
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: balance >= 0 ? "green" : "red",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            ₹{Math.abs(balance).toLocaleString("en-IN")}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {balance >= 0 ? "Credit" : "Due"}
          </Typography>
        </Box>
      </Card>
    </ButtonBase>
  );
};

export default TransporterCard;
