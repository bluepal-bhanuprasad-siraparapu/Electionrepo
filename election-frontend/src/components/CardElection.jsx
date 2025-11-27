// src/components/CardElection.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { Event as EventIcon, People as PeopleIcon } from "@mui/icons-material";

const CardElection = ({ election }) => {
  const statusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "ONGOING":
        return "success";
      case "COMPLETED":
        return "warning";
      case "CANCELLED":
        return "error";
      default:
        return "info";
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
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
      
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 3 }}>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          mb={1}
          color="#1565c0"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#1976d2",
            },
          }}
        >
          {election.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          mb={2} 
          noWrap
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "2.5rem",
          }}
        >
          {election.description}
        </Typography>
        
        <Box display="flex" alignItems="center" mb={1.5}>
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
          <Typography variant="body2" fontWeight={500}>
            <strong>Start:</strong>{" "}
            {new Date(election.startDate).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={1.5}>
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
          <Typography variant="body2" fontWeight={500}>
            <strong>End:</strong>{" "}
            {new Date(election.endDate).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </Typography>
        </Box>
        
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
            <PeopleIcon fontSize="small" />
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            <strong>Max Voters:</strong> {election.maxVoters || "Unlimited"}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="body2" fontWeight={500} mr={1}>
            <strong>Status:</strong>
          </Typography>
          <Chip
            label={election.status}
            color={statusColor(election.status)}
            size="small"
            sx={{
              fontWeight: 500,
              borderRadius: 12,
              height: 28,
              px: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
        
        {/* Push buttons to bottom */}
        <Box display="flex" gap={1.5} mt="auto">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewCandidates(election.id)}
            sx={{
              borderRadius: 20,
              fontWeight: 500,
              px: 2,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            View Candidates
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleAllowedVoters(election.id)}
            sx={{
              borderRadius: 20,
              fontWeight: 500,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Allowed Voters
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Sample handlers (to be implemented in pages)
const handleViewCandidates = (id) => {
  alert(`Go to candidates of election ${id}`);
};

const handleAllowedVoters = (id) => {
  alert(`Go to allowed voters of election ${id}`);
};

export default CardElection;