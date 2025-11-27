// src/pages/Voter/VotePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Alert,
  Box,
  Avatar,
} from "@mui/material";

const VotePage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (electionId) fetchElection();
  }, [electionId]);

  const fetchElection = async () => {
    try {
      const response = await axiosConfig.get(`/elections/${electionId}`);
      setElection({
        ...response.data,
        candidates: response.data.candidates || [],
      });
    } catch (err) {
      console.error("Error fetching election", err);
      setMessage("Failed to load election. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    setMessage("");
    const voterId = localStorage.getItem("voterId");
    if (!voterId) {
      setMessage("Voter ID not found. Please login again.");
      return;
    }
    setVoting(true);
    try {
      await axiosConfig.post(`/votes`, { voterId, candidateId, electionId });
      setMessage("✅ Vote cast successfully! Redirecting...");
      setTimeout(() => navigate(`/voter/elections`), 1500);
    } catch (err) {
      setMessage("⚠️ You may have already voted or an error occurred.");
    } finally {
      setVoting(false);
    }
  };

  if (loading)
    return (
      <Container maxWidth={false} sx={{ 
        mt: 8, 
        textAlign: "center", 
        px: 0,
        background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
        minHeight: '100vh',
        p: 4,
        borderRadius: 4,
      }}>
        <CircularProgress 
          size={60} 
          thickness={4}
          sx={{ 
            color: '#1976d2',
            mb: 2,
          }} 
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading election...
        </Typography>
      </Container>
    );
    
  if (!election) return <p>No election found.</p>;

  return (
    <Container maxWidth={false} sx={{ 
      mt: 6, 
      px: 0,
      background: "linear-gradient(135deg, #f5f9ff 0%, #e3f2fd 100%)",
      minHeight: '100vh',
      p: 4,
      borderRadius: 4,
    }}>
      <Typography 
        variant="h3" 
        gutterBottom
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
        {election.title}
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 3,
          color: "#546e7a",
          fontWeight: 500,
        }}
      >
        {election.description}
      </Typography>
      
      {message && (
        <Alert
          severity={message.startsWith("✅") ? "success" : "warning"}
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {message}
        </Alert>
      )}
      
      <Typography 
        variant="h4" 
        gutterBottom
        color="#1565c0"
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: '#1976d2',
            borderRadius: 2,
          },
        }}
      >
        Candidates
      </Typography>
      
      {election.candidates.length === 0 ? (
        <Box 
          textAlign="center" 
          sx={{ 
            mt: 4,
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
            <Typography variant="h4">?</Typography>
          </Avatar>
          <Typography variant="h6" color="textSecondary" fontWeight={500}>
            No candidates available for this election.
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: 1, mx: "auto" }}
        >
          {election.candidates.map((c) => (
            <Grid item key={c.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  width: "350px",
                  margin: "0 auto",
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
                
                <CardContent sx={{ pt: 3 }}>
                  {/* Candidate Image */}
                  <img
                    src={
                      c.photo
                        ? `data:image/png;base64,${c.photo}`
                        : "/images/default-avatar.png"
                    }
                    alt={c.name}
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  />
                  
                  {/* Name + Party + Logo side by side */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        color="#1565c0"
                      >
                        {c.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight={500}
                        color="#546e7a"
                      >
                        Party: {c.party?.name || "Independent"}
                      </Typography>
                    </Box>
                    
                    {c.party?.logo && (
                      <Box>
                        <img
                          src={`data:image/png;base64,${c.party.logo}`}
                          alt={`${c.party.name} logo`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                            borderRadius: "8px",
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                            },
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </CardContent>
                
                {/* Full-width Vote button */}
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleVote(c.id)}
                    disabled={voting}
                    sx={{
                      borderRadius: 20,
                      fontWeight: "bold",
                      px: 2,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    {voting ? "Voting..." : "Vote"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default VotePage;