import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Badge,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { logout } from "../utils/auth";

const Header = ({ onMenuClick }) => {
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Toolbar>
        {/* Menu icon with animation */}
        <IconButton
          color="primary"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            padding: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              transform: "scale(1.05)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* App title with animation */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#1565c0",
            letterSpacing: "0.5px",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          }}
        >
          Election Hub
        </Typography>
        
        {/* User info and actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* User profile with animation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={handleClick}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{
                "& .MuiBadge-dot": {
                  backgroundColor: "#4caf50",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "2px solid white",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "#1976d2",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <AccountIcon fontSize="small" sx={{ color: "white" }} />
              </Avatar>
            </Badge>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "#1565c0",
              }}
            >
              {username}
            </Typography>
          </Box>
          
          {/* Logout button with animation */}
          <Button
            variant="contained"
            onClick={logout}
            startIcon={<LogoutIcon />}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "20px",
              padding: "6px 16px",
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#1565c0",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
        
        {/* User Menu with animation */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              borderRadius: "12px",
              minWidth: 200,
              overflow: "hidden",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "& .MuiMenuItem-root": {
                padding: "12px 16px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            disabled
            sx={{
              fontWeight: "bold",
              color: "#1565c0",
              borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
              paddingBottom: "12px",
            }}
          >
            {username}
          </MenuItem>
          <MenuItem disabled sx={{ color: "#546e7a" }}>
            {email}
          </MenuItem>
          <MenuItem disabled sx={{ color: "#546e7a", borderTop: "1px solid rgba(0, 0, 0, 0.1)", paddingTop: "12px" }}>
            {role}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;