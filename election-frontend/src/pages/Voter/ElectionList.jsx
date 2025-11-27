// src/pages/Voter/ElectionList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  Box,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import { HowToVote as HowToVoteIcon, Event as EventIcon } from "@mui/icons-material";

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllowedElections();
  }, []);

  const parseISTDate = (dateStr) => {
    if (!dateStr) return null;
    const utcDate = new Date(dateStr + "Z");
    return new Date(
      utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
  };

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

  const fetchAllowedElections = async () => {
    try {
      const voterId = localStorage.getItem("voterId");
      if (!voterId) {
        alert("Voter ID not found. Please login again.");
        return;
      }
      const response = await axiosConfig.get(`/allowed-voters/voter/${voterId}`);
      console.log("election data", response.data);
      const data = response.data.map((av) => av.election);
      const now = new Date();
      const ongoingElections = data.filter((e) => {
        const start = parseISTDate(e.startDate);
        const end = parseISTDate(e.endDate);
        return now >= start && now <= end;
      });
      setElections(ongoingElections);
    } catch (err) {
      console.error("Error fetching elections", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ 
            color: '#1976d2',
            mb: 2,
          }} 
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading elections...
        </Typography>
      </Container>
    );

  return (
    <Box
  sx={{
    mt: 0,
    py: 4,
    px: 4,
    width: "100%",          // take full horizontal width of layout
    background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
    minHeight: "100%",
    borderRadius: 4,
  }}
>

      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom
        color="#1565c0"
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 4,
            backgroundColor: '#1976d2',
            borderRadius: 2,
          },
        }}
      >
        <Avatar 
          sx={{ 
            width: 48, 
            height: 48, 
            backgroundColor: "primary.light",
            color: "primary.main",
            mr: 1.5,
            verticalAlign: 'middle',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <HowToVoteIcon fontSize="medium" />
        </Avatar>
        Ongoing Elections
      </Typography>
      
      {elections.length === 0 ? (
        <Box 
          textAlign="center" 
          sx={{ 
            mt: 8,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 4,
            border: "1px dashed rgba(25, 118, 210, 0.3)",
            py: 6,
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
          <Typography variant="h6" color="textSecondary" fontWeight={500}>
            No elections are currently active for you.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {elections.map((el) => (
            <Grid item xs={12} sm={6} md={4} key={el.id}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  gap: 2,
                  minHeight: 300,
                  background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
                  border: "1px solid rgba(25, 118, 210, 0.1)",
                  overflow: "hidden",
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
                
                {/* Status Chip (Top Right) */}
                <Chip
                  label="Ongoing"
                  color="success"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    fontWeight: "bold",
                    borderRadius: 12,
                    height: 28,
                    px: 1,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                
                {/* Election Title */}
                <Box display="flex" alignItems="center" mt={4}>
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
                    variant="h4" 
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
                  color="#546e7a"
                  fontWeight={500}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {el.description || "No description provided"}
                </Typography>
                
                {/* Dates */}
                <Box>
                  <Box display="flex" alignItems="center" mb={1}>
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
                  
                  <Box display="flex" alignItems="center">
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
                </Box>
                
                {/* Vote Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ 
                    fontWeight: "bold", 
                    mt: 3,
                    borderRadius: 20,
                    px: 2,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onClick={() => navigate(`/voter/vote/${el.id}`)}
                >
                  Vote
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ElectionList;