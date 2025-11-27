// src/pages/Admin/AdminResults.js
import React, { useEffect, useState } from "react";
import axiosConfig from "../../api/axiosConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { 
  TrendingUp as StatsIcon, 
  Event as EventIcon, 
  Person as PersonIcon,
  EmojiEvents  as TrophyIcon,
} from "@mui/icons-material";

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [expandedElection, setExpandedElection] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllResults();
  }, []);

  const fetchAllResults = async () => {
    try {
      const res = await axiosConfig.get("/admin/results/all");
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      alert("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const formatIST = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr + "Z").toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatus = (election) => {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const start = new Date(
      new Date(election.startDate + "Z").toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    const end = new Date(
      new Date(election.endDate + "Z").toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "ongoing";
    return "completed";
  };

  const filteredResults = results.filter((e) => {
    const status = getStatus(e);
    if (status === "upcoming") return false;
    if (statusFilter === "all") return true;
    return status === statusFilter;
  });

  const toBase64Image = (bytes) => {
    if (!bytes) return null;
    return `data:image/png;base64,${bytes}`;
  };

  const toggleExpand = (index) => {
    setExpandedElection((prev) => (prev === index ? null : index));
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="50vh"
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
        <Typography variant="h6" color="text.secondary">
          Loading Results...
        </Typography>
      </Box>
    );
  }

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
        Election Results Dashboard
      </Typography>
      
      {/* Filter */}
      <Box mb={3}>
        <FormControl 
          variant="outlined" 
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 24,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {filteredResults.length === 0 ? (
        <Card 
          elevation={0}
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
            border: "1px solid rgba(25, 118, 210, 0.1)",
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
            <StatsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No results available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try changing your filter settings
          </Typography>
        </Card>
      ) : (
        filteredResults.map((election, index) => {
          const status = getStatus(election);
          const isCompleted = status === "completed";
          const isExpanded = expandedElection === index;
          
          return (
            <Card 
              key={index} 
              elevation={0}
              sx={{ 
                borderRadius: 4, 
                mb: 3,
                overflow: 'hidden',
                background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
                border: "1px solid rgba(25, 118, 210, 0.1)",
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
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      fontWeight="bold"
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
                    
                    <Box display="flex" alignItems="center" mt={1.5}>
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
                        {formatIST(election.startDate)} → {formatIST(election.endDate)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label={status.toUpperCase()} 
                    color={status === "ongoing" ? "primary" : "success"} 
                    size="small"
                    sx={{ 
                      fontWeight: 'bold',
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
                    <StatsIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2" fontWeight={500}>
                    <strong>Total Votes:</strong> {election.totalVotes}
                  </Typography>
                </Box>
                
                {isCompleted && election.winner ? (
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        backgroundColor: "warning.light",
                        color: "warning.main",
                        mr: 1.5,
                      }}
                    >
                      <TrophyIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      <strong>Winner:</strong> {election.winner.candidateName} ({election.winner.partyName})
                    </Typography>
                  </Box>
                ) : (
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
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      {status === "ongoing" ? "⏳ Election is ongoing..." : "No winner yet"}
                    </Typography>
                  </Box>
                )}
                
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    onClick={() => toggleExpand(index)}
                    variant={isExpanded ? "outlined" : "contained"}
                    color="primary"
                    size="small"
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
                    {isExpanded ? "Hide Details" : "View Details"}
                  </Button>
                </Box>
              </CardContent>
              
              {isExpanded && (
                <Box sx={{ 
                  backgroundColor: "rgba(25, 118, 210, 0.03)", 
                  p: 3,
                  borderTop: "1px solid rgba(25, 118, 210, 0.1)",
                }}>
                  <Divider sx={{ mb: 2, borderColor: "rgba(25, 118, 210, 0.1)" }} />
                  
                  <Typography 
                    variant="h6" 
                    fontWeight="bold" 
                    mb={3}
                    color="#1565c0"
                    sx={{
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
                    Candidate Breakdown
                  </Typography>
                  
                  <List>
                    {election.candidateResults.map((c) => (
                      <ListItem 
                        key={c.candidateId} 
                        alignItems="flex-start"
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.05)",
                            borderRadius: 2,
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar 
                            src={toBase64Image(c.candidatePhoto)}
                            alt={c.candidateName}
                            sx={{ 
                              width: 56, 
                              height: 56,
                              border: '2px solid rgba(25, 118, 210, 0.2)',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                              },
                            }}
                          >
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box>
                              <Typography variant="body1" fontWeight="bold" color="#1565c0">
                                {c.candidateName} ({c.partyName})
                              </Typography>
                              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                {c.voteCount} votes ({c.percentage.toFixed(2)}%)
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {c.candidateBio && `📝 ${c.candidateBio}`}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  {/* 📊 Improved Graph UI */}
                  <Box mt={4} height={300}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={election.candidateResults} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                        <XAxis 
                          dataKey="candidateName" 
                          stroke="#546e7a" 
                          tick={{ fontSize: 12, fontWeight: 500 }}
                        />
                        <YAxis 
                          allowDecimals={false} 
                          domain={[0, "dataMax + 2"]} 
                          stroke="#546e7a" 
                          tick={{ fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip 
                          formatter={(value) => [value, 'Votes']}
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 8,
                            border: '1px solid rgba(25, 118, 210, 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, fontWeight: 500 }} />
                        <Bar 
                          dataKey="voteCount" 
                          fill="#4caf50" 
                          name="Votes"
                          radius={[6, 6, 0, 0]}
                          barSize={50}   // ✅ cleaner look
                          isAnimationActive={true}
                        >
                          <LabelList 
                            dataKey="voteCount" 
                            position="top" 
                            style={{ fill: "#333", fontWeight: "bold", fontSize: 12 }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              )}
            </Card>
          );
        })
      )}
    </Box>
  );
};

export default AdminResults;
