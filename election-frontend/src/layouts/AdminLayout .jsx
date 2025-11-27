// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <Box sx={{ 
      display: "grid", 
      gridTemplateAreas: `
        "header header"
        "sidebar main"
      `,
      gridTemplateColumns: `${sidebarOpen ? `${drawerWidth}px` : '0'} 1fr`,
      gridTemplateRows: "64px 1fr",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
      transition: 'all 0.3s ease-in-out'
    }}>
      {/* Header */}
      <Box sx={{ 
        gridArea: "header",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        zIndex: (theme) => theme.zIndex.appBar,
      }}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      </Box>
      
      {/* Sidebar */}
      <Box sx={{ 
        gridArea: "sidebar",
        display: sidebarOpen ? 'block' : 'none',
        transition: 'width 0.3s ease-in-out',
        boxShadow: "4px 0 12px rgba(0, 0, 0, 0.05)",
        zIndex: (theme) => theme.zIndex.drawer,
      }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Box>
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          gridArea: "main",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          p: 3,
          overflow: 'auto',
          transition: 'all 0.3s ease-in-out',
          borderRadius: sidebarOpen ? "24px 0 0 24px" : "24px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;