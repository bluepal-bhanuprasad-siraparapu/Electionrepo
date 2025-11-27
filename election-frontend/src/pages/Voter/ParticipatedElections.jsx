// src/pages/Voter/ParticipatedElections.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { parseISTDate, getNowIST } from "../../utils/dateUtils";
// MUI
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PollIcon from "@mui/icons-material/Poll";

const ParticipatedElections = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipatedElections();
  }, []);

  const fetchParticipatedElections = async () => {
    try {
      const voterId = localStorage.getItem("voterId");
      const response = await axiosConfig.get(
        `/votes/voter/${voterId}/participated-elections`
      );
      setElections(response.data);
    } catch (err) {
      console.error("Error fetching participated elections", err);
      alert("Failed to load participated elections.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box 
        textAlign="center" 
        mt={4}
        flexDirection="column"
        alignItems="center"
        display="flex"
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
          Loading your participated elections...
        </Typography>
      </Box>
    );

  if (elections.length === 0)
    return (
      <Box 
        textAlign="center" 
        mt={3}
        sx={{
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
          You have not participated in any elections yet.
        </Typography>
      </Box>
    );

  const now = getNowIST();

  return (
    <Box sx={{ 
      p: 3,
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
      minHeight: '100vh',
      borderRadius: 4,
    }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        fontWeight="bold"
        color="#1565c0"
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
        My Participated Elections
      </Typography>
      
      {elections.map((el) => {
        const start = parseISTDate(el.startDate);
        const end = parseISTDate(el.endDate);
        return (
          <Card
            key={el.id}
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: 4,
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
            
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h5" 
                fontWeight="bold"
                color="#1565c0"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
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
                  <HowToVoteIcon fontSize="small" />
                </Avatar>
                {el.title}
              </Typography>
              
              <Divider sx={{ my: 2, borderColor: "rgba(25, 118, 210, 0.1)" }} />
              
              {end < now ? (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PollIcon />}
                  component={Link}
                  to={`/voter/results/${el.id}`}
                  sx={{
                    borderRadius: 20,
                    fontWeight: 500,
                    px: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  View Results
                </Button>
              ) : (
                <Typography 
                  color="text.secondary" 
                  fontStyle="italic"
                  fontWeight={500}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      backgroundColor: "primary.light",
                      color: "primary.main",
                      mr: 1,
                    }}
                  >
                    ⏳
                  </Avatar>
                  Ongoing
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default ParticipatedElections;