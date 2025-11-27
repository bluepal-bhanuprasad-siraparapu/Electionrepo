// src/pages/Admin/AllowedVoters.js
import React, { useEffect, useState } from "react";
import axiosConfig from "../../api/axiosConfig";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import { 
  PersonAdd as AddIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  PersonAdd,
  HowToReg as RegisterIcon,
} from "@mui/icons-material";

const AllowedVoters = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [allowedVoters, setAllowedVoters] = useState([]);
  const [voterId, setVoterId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchElections();
  }, []);

  useEffect(() => {
    if (selectedElection) {
      fetchAllowedVoters(selectedElection.id);
    } else {
      setAllowedVoters([]);
    }
  }, [selectedElection]);

  const fetchElections = async () => {
    try {
      const response = await axiosConfig.get("/elections");
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
      setError("Failed to fetch elections");
    }
  };

  const fetchAllowedVoters = async (electionId) => {
    try {
      const response = await axiosConfig.get(`/allowed-voters/election/${electionId}`);
      setAllowedVoters(response.data);
    } catch (error) {
      console.error("Error fetching allowed voters:", error);
      setError("Failed to fetch allowed voters");
    }
  };

  const addVoter = async () => {
    if (!voterId || !selectedElection) {
      setError("Please select an election and enter a voter ID");
      return;
    }
    
    try {
      setLoading(true);
      await axiosConfig.post("/allowed-voters", {
        voterId,
        electionId: selectedElection.id,
      });
      alert("Voter added successfully!");
      setVoterId("");
      fetchAllowedVoters(selectedElection.id);
    } catch (error) {
      console.error("Error adding voter:", error);
      setError(error.response?.data?.message || "Failed to add voter");
    } finally {
      setLoading(false);
    }
  };

  const removeVoter = async (id) => {
    if (!window.confirm("Are you sure you want to remove this voter?")) return;
    try {
      await axiosConfig.delete(`/allowed-voters/${id}`);
      alert("Voter removed successfully!");
      fetchAllowedVoters(selectedElection.id);
    } catch (error) {
      console.error("Error removing voter:", error);
      setError(error.response?.data?.message || "Failed to remove voter");
    }
  };

  return (
    <Box sx={{ 
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
      minHeight: '100vh',
      p: 3,
      borderRadius: 4,
    }}>
      {/* Header */}
      <Typography 
        variant="h3" 
        component="h1" 
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
        Manage Allowed Voters
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {error}
        </Alert>
      )}
      
      {/* Election Selection Card */}
      <Card 
        elevation={0}
        sx={{ 
          borderRadius: 4, 
          mb: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
          border: "1px solid rgba(25, 118, 210, 0.1)",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(25, 118, 210, 0.1)",
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
            variant="h6" 
            fontWeight="bold" 
            mb={2} 
            color="#1565c0"
            sx={{ 
              display: "flex", 
              alignItems: "center",
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                backgroundColor: '#1976d2',
                borderRadius: 2,
              },
            }}
          >
            <Avatar sx={{ 
              width: 32, 
              height: 32, 
              backgroundColor: "primary.light",
              color: "primary.main",
              mr: 1.5,
            }}>
              <GroupIcon fontSize="small" />
            </Avatar>
            Select Election
          </Typography>
          
          <Box display="flex" flexWrap="wrap" gap={1.5}>
            {elections.map((election) => (
              <Button
                key={election.id}
                variant={selectedElection?.id === election.id ? "contained" : "outlined"}
                color="primary"
                onClick={() => setSelectedElection(election)}
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
                {election.title}
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>
      
      {selectedElection && (
        <>
          {/* Add Voter Card */}
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 4, 
              mb: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
              border: "1px solid rgba(25, 118, 210, 0.1)",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 16px rgba(25, 118, 210, 0.1)",
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
                variant="h6" 
                fontWeight="bold" 
                mb={2} 
                color="#1565c0"
                sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: '#1976d2',
                    borderRadius: 2,
                  },
                }}
              >
                <Avatar sx={{ 
                  width: 32, 
                  height: 32, 
                  backgroundColor: "primary.light",
                  color: "primary.main",
                  mr: 1.5,
                }}>
                  <PersonAdd fontSize="small" />
                </Avatar>
                Add Voter to {selectedElection.title}
              </Typography>
              
              <Box display="flex" alignItems="center" gap={1.5}>
                <TextField
                  label="Voter ID"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addVoter}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                  sx={{
                    borderRadius: 20,
                    fontWeight: 500,
                    px: 3,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Add Voter
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Allowed Voters List Card */}
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 4,
              background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
              border: "1px solid rgba(25, 118, 210, 0.1)",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 16px rgba(25, 118, 210, 0.1)",
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
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  color="#1565c0"
                  sx={{ 
                    display: "flex", 
                    alignItems: "center",
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: 40,
                      height: 3,
                      backgroundColor: '#1976d2',
                      borderRadius: 2,
                    },
                  }}
                >
                  <Avatar sx={{ 
                    width: 32, 
                    height: 32, 
                    backgroundColor: "primary.light",
                    color: "primary.main",
                    mr: 1.5,
                  }}>
                    <RegisterIcon fontSize="small" />
                  </Avatar>
                  Allowed Voters ({allowedVoters.length})
                </Typography>
                <Chip 
                  label={selectedElection.title} 
                  color="primary" 
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
              
              {allowedVoters.length === 0 ? (
                <Box 
                  textAlign="center" 
                  py={5}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    borderRadius: 3,
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
                    <PersonAdd fontSize="large" />
                  </Avatar>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    No voters added yet
                  </Typography>
                </Box>
              ) : (
                <List>
                  {allowedVoters.map((voter, index) => (
                    <React.Fragment key={voter.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeVoter(voter.id)}
                            color="error"
                            sx={{
                              p: 0.5,
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.05)",
                            borderRadius: 2,
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center">
                              <Typography variant="body1" fontWeight="bold" color="#1565c0">
                                {voter.voterId}
                              </Typography>
                              <Chip 
                                label={`ID: ${voter.id}`} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  ml: 1.5,
                                  fontWeight: 500,
                                  borderRadius: 12,
                                  height: 24,
                                  px: 1,
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "scale(1.05)",
                                  },
                                }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < allowedVoters.length - 1 && (
                        <Divider sx={{ borderColor: "rgba(25, 118, 210, 0.1)" }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default AllowedVoters;