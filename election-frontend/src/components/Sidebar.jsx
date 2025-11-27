// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  HowToVote as ElectionIcon,
  Person as CandidateIcon,
  Group as PartyIcon,
  People as VotersIcon,
  Assessment as ResultsIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Elections", icon: <ElectionIcon />, path: "/admin/elections" },
  { text: "Candidates", icon: <CandidateIcon />, path: "/admin/candidates" },
  { text: "Parties", icon: <PartyIcon />, path: "/admin/parties" },
  { text: "Allowed Voters", icon: <VotersIcon />, path: "/admin/allowed-voters" },
  { text: "Results", icon: <ResultsIcon />, path: "/admin/results" },
];

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "64px", // below header
          height: "calc(100% - 64px)",
          background: "linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer,
          boxShadow: "4px 0 12px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      {/* Sidebar Header with Close Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            transition: "all 0.3s ease",
            "&:hover": { transform: "translateX(4px)" },
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#1976d2",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            🗳️
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#1565c0"
              sx={{ textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)" }}
            >
              Admin Portal
            </Typography>
            <Typography
              variant="body2"
              color="#546e7a"
              sx={{ fontSize: "0.8rem" }}
            >
              Manage Elections
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#1565c0",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "12px",
            padding: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              transform: "scale(1.1)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />
      
      {/* Menu Items */}
      <List sx={{ py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: "0 24px 24px 0",
                mx: 1,
                my: 0.5,
                transition: "all 0.3s ease",
                "&.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  borderLeft: "4px solid #1976d2",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "#1976d2" : "#546e7a",
                  minWidth: 40,
                  transition: "all 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? "bold" : "500",
                  color: location.pathname === item.path ? "#1565c0" : "#37474f",
                  fontSize: "0.95rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />
      
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Typography
          variant="caption"
          color="#546e7a"
          sx={{
            fontWeight: 500,
            letterSpacing: "0.5px",
            textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)",
          }}
        >
          Election Hub v1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;