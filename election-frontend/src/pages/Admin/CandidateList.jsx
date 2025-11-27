import React, { useEffect, useState } from "react";
import CardCandidate from "../../components/CardCandidate";
import CandidateForm from "../../components/CandidateForm";
import axiosConfig from "../../api/axiosConfig";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Avatar,
  Alert,
} from "@mui/material";
import { Add, Close, Search } from "@mui/icons-material";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axiosConfig.get("/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
    try {
      await axiosConfig.delete(`/candidates/${id}`);
      alert("Candidate deleted successfully");
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
      alert("Failed to delete candidate");
    }
  };

  const handleEdit = (candidate) => {
    setEditingCandidate(candidate);
    setOpenForm(true);
  };

  const handleFormSubmit = () => {
    setEditingCandidate(null);
    setOpenForm(false);
    fetchCandidates();
  };

  const handleCloseForm = () => {
    setEditingCandidate(null);
    setOpenForm(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // filter candidates by name, party, or election
  const filteredCandidates = candidates.filter((candidate) => {
    const name = candidate.name?.toLowerCase() || "";
    const party = candidate.party?.name?.toLowerCase() || "";
    const election = candidate.election?.title?.toLowerCase() || "";
    return (
      name.includes(searchQuery) ||
      party.includes(searchQuery) ||
      election.includes(searchQuery)
    );
  });

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
          Loading Candidates...
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
        Candidate Management
      </Typography>
      
      {/* Search bar */}
      <Box mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by candidate, party, or election"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            width: "100%",
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
                  <Search color="primary" />
                </Avatar>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Add Candidate Button (below search, aligned right) */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenForm(true)}
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
          Add Candidate
        </Button>
      </Box>
      
      {/* Candidate Form in Popup */}
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth={false}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
            border: "1px solid rgba(25, 118, 210, 0.1)",
            overflow: "hidden",
            width: "420px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(25, 118, 210, 0.05)",
            borderBottom: "1px solid rgba(25, 118, 210, 0.1)",
            pb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#1565c0">
            {editingCandidate ? "Edit Candidate" : "Add Candidate"}
          </Typography>
          <IconButton 
            onClick={handleCloseForm}
            sx={{
              color: "#1565c0",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "12px",
              padding: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                transform: "scale(1.1)",
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <CandidateForm
            onCandidateSaved={handleFormSubmit}
            editingCandidate={editingCandidate}
          />
        </DialogContent>
      </Dialog>
      
      {/* Candidate List */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        padding: "20px",
      }}>
        {filteredCandidates.length === 0 ? (
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
              gridColumn: "1 / -1",
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
              <Search fontSize="large" />
            </Avatar>
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              No candidates found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or create a new candidate
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setOpenForm(true)}
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
              Add Candidate
            </Button>
          </Box>
        ) : (
          filteredCandidates.map((candidate) => (
            <CardCandidate
              key={candidate.id}
              candidate={candidate}
              onEditClick={handleEdit}
              onDeleteClick={handleDelete}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default CandidateList;