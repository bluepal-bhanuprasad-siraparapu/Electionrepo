// src/layouts/VoterLayout.jsx
import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  HowToVote as ElectionIcon,
  Assessment as ResultsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const VoterLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // User info menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  
  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/voter/dashboard' },
    { text: 'Elections', icon: <ElectionIcon />, path: '/voter/elections' },
    { text: 'Results', icon: <ResultsIcon />, path: '/voter/results' },
  ];
  
  const username = localStorage.getItem("username") || "Voter";
  const email = localStorage.getItem("email") || "Not Available";
  const role = localStorage.getItem("role") || "VOTER";
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)"
    }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            onClick={toggleSidebar}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "12px",
              padding: "8px",
              mr: 1,
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
          <Typography 
            variant="h6" 
            component="div" 
            sx={{
              fontWeight: 'bold',
              flexGrow: 1,
              color: "#1565c0",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)",
            }}
          >
            Election Hub
          </Typography>
          
          {/* Right Side - User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="User Info">
              <Button
                onClick={handleUserMenuClick}
                sx={{ 
                  color: "#1565c0", 
                  textTransform: 'none', 
                  display: 'flex', 
                  alignItems: 'center',
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "20px",
                  padding: "6px 12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: "#1976d2",
                    mr: 1,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <AccountIcon fontSize="small" sx={{ color: "white" }} />
                </Avatar>
                <Typography variant="body1" sx={{ color: "#1565c0", fontWeight: 500 }}>
                  {username}
                </Typography>
              </Button>
            </Tooltip>
            
            <Button
              variant="contained"
              onClick={handleLogout}
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
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* User Info Menu Popup */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
      >
        <MenuItem disabled sx={{ 
          fontWeight: "bold", 
          color: "#1565c0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          paddingBottom: "12px",
        }}>
          <Typography variant="body2">
            <strong>Name:</strong> {username}
          </Typography>
        </MenuItem>
        <MenuItem disabled sx={{ color: "#546e7a" }}>
          <Typography variant="body2">
            <strong>Email:</strong> {email}
          </Typography>
        </MenuItem>
        <MenuItem disabled sx={{ 
          color: "#546e7a", 
          borderTop: "1px solid rgba(0, 0, 0, 0.1)", 
          paddingTop: "12px" 
        }}>
          <Typography variant="body2">
            <strong>Role:</strong> {role}
          </Typography>
        </MenuItem>
      </Menu>
      
      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: "linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "4px 0 12px rgba(0, 0, 0, 0.05)",
            top: 64,
            height: 'calc(100% - 64px)',
            transform: sidebarOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
            transition: 'transform 0.3s ease-in-out',
          },
        }}
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            invisible: true,
          },
        }}
        hideBackdrop={true}
      >
        <Box sx={{
          p: 3,
          textAlign: 'center',
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Box>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 1,
                bgcolor: "#1976d2",
                fontSize: '1.5rem',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              🗳️
            </Avatar>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              color="#1565c0"
              sx={{ textShadow: "1px 1px 2px rgba(255, 255, 255, 0.7)" }}
            >
              Voter Portal
            </Typography>
            <Typography 
              variant="body2" 
              color="#546e7a"
              sx={{ fontSize: "0.85rem" }}
            >
              Secure Voting System
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleSidebar}
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
        
        <List sx={{ pt: 1, backgroundColor: "transparent" }}>
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
                <ListItemIcon sx={{
                  color: location.pathname === item.path ? "#1976d2" : "#546e7a",
                  minWidth: 40,
                  transition: "all 0.3s ease",
                }}>
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
        
        <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.3)" }} />
        
        <Box sx={{ 
          p: 2, 
          textAlign: 'center', 
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        }}>
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
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          overflow: 'auto',
          minHeight: '100vh',
          pt: '64px',
          transition: 'all 0.3s ease-in-out',
          marginLeft: sidebarOpen ? `${drawerWidth}px` : '0',
          boxShadow: sidebarOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none',
          borderRadius: sidebarOpen ? "24px 0 0 24px" : "24px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default VoterLayout;