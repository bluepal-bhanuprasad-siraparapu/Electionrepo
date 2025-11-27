// src/pages/Admin/ElectionList.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Chip,
  Alert,
  CircularProgress,
  InputAdornment,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Search as SearchIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

const ElectionList = () => {
  const [elections, setElections] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingElection, setEditingElection] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxVoters: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await axiosInstance.get("/elections");
      setElections(response.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
      setError("Failed to fetch elections");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTimeLocal = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "Z");
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const parts = new Intl.DateTimeFormat("en-GB", options).formatToParts(date);
    const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
  };

  const toISTISOString = (localDateTime) => {
    if (!localDateTime) return null;
    const date = new Date(localDateTime);
    const istOffset = 5.5 * 60 * 60000;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000 - istOffset)
      .toISOString()
      .slice(0, 19);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        startDate: toISTISOString(formData.startDate),
        endDate: toISTISOString(formData.endDate),
        maxVoters: parseInt(formData.maxVoters, 10),
      };
      if (editingElection) {
        await axiosInstance.put(`/elections/${editingElection}`, payload);
      } else {
        await axiosInstance.post("/elections", payload);
      }
      fetchElections();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving election:", error.response?.data || error.message);
      setError("Failed to save election");
    }
  };

  const handleEdit = (election) => {
    setFormData({
      title: election.title,
      description: election.description,
      startDate: formatDateTimeLocal(election.startDate),
      endDate: formatDateTimeLocal(election.endDate),
      maxVoters: election.maxVoters,
    });
    setEditingElection(election.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this election?")) {
      try {
        await axiosInstance.delete(`/elections/${id}`);
        fetchElections();
      } catch (error) {
        console.error("Error deleting election:", error);
        setError("Failed to delete election");
      }
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      maxVoters: "",
    });
    setEditingElection(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError("");
  };

  const getElectionStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate + "Z");
    const end = new Date(endDate + "Z");
    if (now < start) return { status: "Not Started", color: "info" };
    if (now >= start && now <= end) return { status: "Ongoing", color: "success" };
    return { status: "Completed", color: "warning" };
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
          Loading Elections...
        </Typography>
      </Box>
    );
  }

  const filteredElections = elections.filter((election) =>
    election.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
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
        <Typography 
          variant="h3" 
          component="h1" 
          fontWeight="bold"
          color="#1565c0"
        >
          Election Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
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
          Add Election
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mb={4}>
        <TextField
          fullWidth
          placeholder="Search elections by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                  <SearchIcon color="primary" />
                </Avatar>
              </InputAdornment>
            ),
          }}
        />
      </Box>

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

      {/* Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="flex-start">
        {filteredElections.length > 0 ? (
          filteredElections.map((election) => {
            const statusInfo = getElectionStatus(election.startDate, election.endDate);
            return (
              <Card
                key={election.id}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  width: 365,
                 // height: 240,
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
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      noWrap
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
                    <Chip
                      label={statusInfo.status}
                      color={statusInfo.color}
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
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "2.5rem",
                    }}
                  >
                    {election.description}
                  </Typography>
                  
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
                    <Typography variant="body2" fontWeight={500}>
                      <strong>Start:</strong>{" "}
                      {new Date(election.startDate + "Z").toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </Typography>
                  </Box>
                  
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
                    <Typography variant="body2" fontWeight={500}>
                      <strong>End:</strong>{" "}
                      {new Date(election.endDate + "Z").toLocaleString("en-IN", {
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
                      <GroupIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body2" fontWeight={500}>
                      <strong>Max Voters:</strong> {election.maxVoters}
                    </Typography>
                  </Box>
                  
                  <Box mt="auto" display="flex" justifyContent="flex-end">
                    {/* Edit Button - Simple icon without background */}
                    <IconButton 
                      onClick={() => handleEdit(election)}
                      sx={{
                        color: "#1976d2",
                        p: 0.5,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    
                    {/* Delete Button - Simple icon without background */}
                    <IconButton 
                      onClick={() => handleDelete(election.id)}
                      sx={{
                        color: "#d32f2f",
                        p: 0.5,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
            sx={{ 
              width: "100%", 
              py: 8,
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
              }}
            >
              <EventIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              No elections found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or create a new election
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                borderRadius: 20,
                fontWeight: 500,
                px: 3,
                mt: 2,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Add Election
            </Button>
          </Box>
        )}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
            border: "1px solid rgba(25, 118, 210, 0.1)",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            backgroundColor: "rgba(25, 118, 210, 0.05)",
            borderBottom: "1px solid rgba(25, 118, 210, 0.1)",
            pb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#1565c0">
            {editingElection ? "Edit Election" : "Add New Election"}
          </Typography>
        </DialogTitle>
        
        <DialogContent dividers sx={{ pt: 3 }}>
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
          
          {/* Election Details */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="#1565c0">
            Election Details
          </Typography>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
              sx={{
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                      <TitleIcon color="primary" />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              required
              sx={{
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light', alignSelf: 'flex-start', mt: 1 }}>
                      <DescriptionIcon color="primary" />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {/* Schedule */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="#1565c0">
            Schedule
          </Typography>
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
            <TextField
              fullWidth
              label="Start Date & Time"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              sx={{
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                      <EventIcon color="primary" />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label="End Date & Time"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              sx={{
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                      <EventIcon color="primary" />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {/* Settings */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="#1565c0">
            Settings
          </Typography>
          <TextField
            fullWidth
            label="Max Voters"
            type="number"
            value={formData.maxVoters}
            onChange={(e) => setFormData({ ...formData, maxVoters: e.target.value })}
            margin="normal"
            required
            sx={{
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                    <GroupIcon color="primary" />
                  </Avatar>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        
        <DialogActions 
          sx={{ 
            backgroundColor: "rgba(25, 118, 210, 0.05)",
            borderTop: "1px solid rgba(25, 118, 210, 0.1)",
            px: 3,
            py: 2,
          }}
        >
          <Button 
            onClick={handleCloseDialog}
            sx={{
              borderRadius: 20,
              fontWeight: 500,
              px: 3,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
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
            {editingElection ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ElectionList;