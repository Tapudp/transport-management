import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Warning as HotlistIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Card,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { AppContext } from "../context/AppContext";
import ConfirmationDialog from "./ConfirmationDialog";

const TransporterCard = ({ transporter, onClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [hotlistConfirmOpen, setHotlistConfirmOpen] = useState(false);
  const { deleteTransporter, toggleHotlist } = useContext(AppContext);

  const balance = transporter.balance || 0;
  const open = Boolean(anchorEl);

  // Fixed color codes
  const HOTLIST_COLOR = "#ff4444"; // Red for hotlist
  const POSITIVE_BALANCE = "#4CAF50"; // Green for positive balance
  const NEGATIVE_BALANCE = "#f44336"; // Red for negative balance
  const SECONDARY_TEXT = "#666666"; // Gray for secondary text

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(ROUTES.ADD_TRANSPORTER, {
      state: { editTransporter: transporter },
    });
    handleMenuClose();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const handleHotlistClick = (event) => {
    event.stopPropagation();
    setHotlistConfirmOpen(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    deleteTransporter(transporter.panNumber);
    setDeleteConfirmOpen(false);
  };

  const confirmHotlist = () => {
    toggleHotlist(transporter.panNumber);
    setHotlistConfirmOpen(false);
  };

  return (
    <>
      <ButtonBase onClick={onClick} style={{ width: "100%" }}>
        <Card
          sx={{
            mb: 2,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            borderLeft: transporter.isHotlisted
              ? `4px solid ${HOTLIST_COLOR}`
              : "none",
            paddingRight: "8px", // Add some padding to prevent menu from touching edge
          }}
        >
          {/* Left side - Transporter Info */}
          <Box
            sx={{
              width: "60%",
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
                }}
              >
                {transporter.firmName}
                {transporter.isHotlisted && (
                  <span
                    style={{
                      color: HOTLIST_COLOR,
                      marginLeft: "8px",
                      fontSize: "0.8rem",
                    }}
                  >
                    (Hotlisted)
                  </span>
                )}
              </Typography>
            </Tooltip>
            <Tooltip title={transporter.ownerName}>
              <Typography
                sx={{
                  color: SECONDARY_TEXT,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {transporter.ownerName}
              </Typography>
            </Tooltip>
          </Box>

          {/* Right side - Balance and Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "8px", // Reduced gap between balance and menu
              width: "40%", // Combined space for balance and menu
            }}
          >
            <Box
              sx={{
                // padding: "16px",
                textAlign: "right",
                minWidth: "120px",
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: balance >= 0 ? POSITIVE_BALANCE : NEGATIVE_BALANCE,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ₹{Math.abs(balance).toLocaleString("en-IN")}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: SECONDARY_TEXT,
                }}
              >
                {balance >= 0 ? "Credit" : "Due"}
              </Typography>
            </Box>

            <IconButton
              onClick={handleMenuClick}
              sx={{
                padding: "8px",
                // marginRight: "8px",
                color: "#333333", // Dark gray for the menu icon
                marginLeft: "0", // Remove any left margin
                width: "25%",
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Card>
      </ButtonBase>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, color: "#2196F3" }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon sx={{ mr: 1, color: NEGATIVE_BALANCE }} /> Delete
        </MenuItem>
        <MenuItem onClick={handleHotlistClick}>
          <HotlistIcon
            sx={{
              mr: 1,
              color: transporter.isHotlisted ? NEGATIVE_BALANCE : "#FF9800",
            }}
          />
          {transporter.isHotlisted ? "Remove from Hotlist" : "Add to Hotlist"}
        </MenuItem>
      </Menu>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete this transporter?"
        onConfirm={confirmDelete}
      />

      <ConfirmationDialog
        open={hotlistConfirmOpen}
        onClose={() => setHotlistConfirmOpen(false)}
        title={
          transporter.isHotlisted ? "Remove from Hotlist" : "Add to Hotlist"
        }
        message={`Are you sure you want to ${
          transporter.isHotlisted ? "remove" : "add"
        } this transporter ${
          transporter.isHotlisted ? "from" : "to"
        } the hotlist?`}
        onConfirm={confirmHotlist}
      />
    </>
  );
};

export default TransporterCard;
