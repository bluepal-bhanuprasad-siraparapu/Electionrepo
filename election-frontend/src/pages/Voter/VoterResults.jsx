// src/pages/Voter/VoterResults.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { parseISTDate, getNowIST } from "../../utils/dateUtils";
// MUI
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const VoterResults = () => {
  const { electionId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [electionId]);

  const fetchResults = async () => {
    try {
      const response = await axiosConfig.get(`/results/election/${electionId}`);
      setResult(response.data);
    } catch (err) {
      console.error("❌ Error fetching results", err);
      alert("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  const toBase64Image = (bytes) => {
    if (!bytes) return null;
    return `data:image/png;base64,${bytes}`;
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
          Loading results...
        </Typography>
      </Box>
    );

  if (!result) return <Typography>No results found.</Typography>;

  if (parseISTDate(result.endDate) > getNowIST()) {
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
          ⏳
        </Avatar>
        <Typography variant="h6" color="textSecondary" fontWeight={500}>
          ⏳ Results will be available after the election ends (IST).
        </Typography>
      </Box>
    );
  }

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
        Results for {result.title}
      </Typography>
      
      <Typography 
        variant="body1" 
        gutterBottom
        fontWeight={500}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#546e7a",
        }}
      >
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32, 
            backgroundColor: "primary.light",
            color: "primary.main",
            mr: 1.5,
          }}
        >
          <HowToVoteIcon fontSize="small" />
        </Avatar>
        Total Votes: <b style={{ marginLeft: '4px' }}>{result.totalVotes}</b>
      </Typography>
      
      <Divider sx={{ my: 3, borderColor: "rgba(25, 118, 210, 0.1)" }} />
      
      <Typography 
        variant="h5" 
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
        Candidate Breakdown
      </Typography>
      
      {result.candidateResults.map((c, index) => (
        <Card
          key={c.candidateId}
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
          
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
            <Avatar
              src={toBase64Image(c.candidatePhoto)}
              alt={c.candidateName}
              sx={{ 
                width: 60, 
                height: 60,
                border: '2px solid rgba(25, 118, 210, 0.2)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                },
              }}
            />
            
            <Box flex={1}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold"
                color="#1565c0"
              >
                #{index + 1} {c.candidateName} ({c.partyName})
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                fontWeight={500}
              >
                {c.voteCount} votes ({c.percentage.toFixed(2)}%)
              </Typography>
              
              <LinearProgress
                variant="determinate"
                value={c.percentage}
                sx={{ 
                  mt: 1.5, 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#1976d2',
                    borderRadius: 5,
                  },
                }}
              />
            </Box>
            
            {c.partyLogo && (
              <Avatar
                src={toBase64Image(c.partyLogo)}
                alt={c.partyName}
                variant="square"
                sx={{ 
                  width: 60, 
                  height: 60,
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
              />
            )}
          </CardContent>
        </Card>
      ))}
      
      {result.winner && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
            border: "1px solid rgba(25, 118, 210, 0.1)",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 16px rgba(25, 118, 210, 0.1)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: "warning.light",
              color: "warning.main",
              mr: 2,
            }}
          >
            <EmojiEventsIcon />
          </Avatar>
          <Typography 
            variant="h5" 
            color="primary" 
            fontWeight="bold"
          >
            Winner: {result.winner.candidateName} ({result.winner.partyName})
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VoterResults;