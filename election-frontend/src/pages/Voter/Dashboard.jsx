// src/pages/Voter/Dashboard.js
import React, { useEffect, useState } from "react";
import axiosConfig from "../../api/axiosConfig";
import {
  Box,
  Card,
  Typography,
  Chip,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const Dashboard = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllowedElections();
  }, []);

  const fetchAllowedElections = async () => {
    try {
      const voterId = localStorage.getItem("voterId");
      if (!voterId) {
        alert("Voter ID not found. Please login again.");
        return;
      }
      const response = await axiosConfig.get(`/allowed-voters/voter/${voterId}`);
      console.log("Data", response.data);
      const electionsData = response.data.map((av) => av.election);
      setElections(electionsData);
    } catch (err) {
      console.error("Error fetching dashboard elections", err);
      alert("Failed to load your elections.");
    } finally {
      setLoading(false);
    }
  };

  // Convert backend LocalDateTime → IST Date
  const parseISTDate = (dateStr) => {
    if (!dateStr) return null;
    const utcDate = new Date(dateStr + "Z");
    return new Date(
      utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
  };

  // Format IST date for display
  const formatISTDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr + "Z").toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Election status in IST
  const getElectionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = parseISTDate(startDate);
    const end = parseISTDate(endDate);
    if (now < start) return "Upcoming";
    if (now >= start && now <= end) return "Ongoing";
    return "Completed";
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="64vh"
        flexDirection="column"
      >
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ 
            color: '#1976d2',
            mb: 2,
          }} 
        />
        <Typography variant="h6" color="textSecondary">
          Loading your elections...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
      minHeight: '100vh',
      p: 4,
      borderRadius: 4,
    }}>
      {/* Header */}
      <Typography 
        variant="h3" 
        fontWeight="bold"
        color="#1565c0"
        mb={4}
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: 0,
            width: 80,
            height: 4,
            backgroundColor: '#1976d2',
            borderRadius: 2,
          },
        }}
      >
        Welcome to Your Dashboard
      </Typography>
      
      {elections.length === 0 ? (
        <Box 
          textAlign="center" 
          py={8}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 4,
            border: "1px dashed rgba(25, 118, 210, 0.3)",
          }}
        >
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              backgroundColor: "primary.light",
              color: "primary.main",
              mb: 2,
              mx: "auto",
            }}
          >
            <HowToVoteIcon fontSize="large" />
          </Avatar>
          <Typography variant="body1" color="textSecondary" fontWeight={500}>
            You are not assigned to any elections yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {elections.map((el) => {
            const status = getElectionStatus(el.startDate, el.endDate);
            return (
              <Grid item xs={12} sm={6} md={4} key={el.id}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
                    border: "1px solid rgba(25, 118, 210, 0.1)",
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(25, 118, 210, 0.15)",
                      "& .card-header": {
                        backgroundColor: "rgba(25, 118, 210, 0.05)",
                      },
                    },
                  }}
                >
                  <Box
                    className="card-header"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: "linear-gradient(90deg, #1976d2, #64b5f6, #90caf9)",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                  
                  {/* Election Title with Icon */}
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        backgroundColor: "primary.light",
                        color: "primary.main",
                        mr: 1.5,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                    >
                      <HowToVoteIcon />
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      fontWeight="bold"
                      color="#1565c0"
                      sx={{
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#1976d2",
                        },
                      }}
                    >
                      {el.title}
                    </Typography>
                  </Box>
                  
                  {/* Election Description */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      color: "#546e7a",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {el.description || "No description provided"}
                  </Typography>
                  
                  {/* Dates Section */}
                  <Box mt={2}>
                    {/* Start Time */}
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28, 
                          backgroundColor: "primary.light",
                          color: "primary.main",
                          mr: 1.5,
                        }}
                      >
                        <EventIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        <strong>Start:</strong> {formatISTDate(el.startDate)}
                      </Typography>
                    </Box>
                    
                    {/* End Time */}
                    <Box display="flex" alignItems="center" mb={3}>
                      <Avatar 
                        sx={{ 
                          width: 28, 
                          height: 28, 
                          backgroundColor: "primary.light",
                          color: "primary.main",
                          mr: 1.5,
                        }}
                      >
                        <EventIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        <strong>End:</strong> {formatISTDate(el.endDate)}
                      </Typography>
                    </Box>
                    
                    {/* Status Chip at bottom, full width */}
                    <Chip
                      label={status}
                      color={
                        status === "Upcoming"
                          ? "warning"
                          : status === "Ongoing"
                          ? "success"
                          : "default"
                      }
                      sx={{ 
                        mt: "auto",
                        fontWeight: "bold",
                        borderRadius: 12,
                        height: 32,
                        px: 1,
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;