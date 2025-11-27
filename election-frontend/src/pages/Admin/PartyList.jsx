import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import PartyForm from "../../components/PartyForm";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

const PartyList = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingParty, setEditingParty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParties, setFilteredParties] = useState([]);

  // Fetch parties
  const fetchParties = async () => {
    try {
      const res = await axiosInstance.get("/parties");
      setParties(res.data);
      setFilteredParties(res.data);
    } catch (err) {
      console.error("Error fetching parties:", err);
      setError("Failed to load parties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredParties(parties);
    } else {
      const filtered = parties.filter(
        (party) =>
          party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (party.description &&
            party.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredParties(filtered);
    }
  }, [searchTerm, parties]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this party?")) return;
    try {
      await axiosInstance.delete(`/parties/${id}`);
      fetchParties();
    } catch (err) {
      console.error("Error deleting party:", err);
      setError("Failed to delete party");
    }
  };

  // Open Add/Edit Dialog
  const handleOpenDialog = (party = null) => {
    setEditingParty(party);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingParty(null);
  };

  const handlePartySaved = () => {
    fetchParties();
    handleCloseDialog();
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
          Loading Parties...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          Party Management
        </Typography>
        <Chip 
          label={`${parties.length} parties`} 
          color="primary" 
          sx={{
            fontWeight: 500,
            borderRadius: 12,
            height: 32,
            px: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>
      
      {/* Search Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
          border: "1px solid rgba(25, 118, 210, 0.1)",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search parties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          variant="outlined"
          size="small"
        />
      </Paper>
      
      {/* Add Party Button */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
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
          Add Party
        </Button>
      </Box>
      
      {/* Party Table */}
      <Card 
        elevation={0} 
        sx={{ 
          borderRadius: 4, 
          overflow: "hidden",
          background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
          border: "1px solid rgba(25, 118, 210, 0.1)",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ 
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                borderBottom: "2px solid rgba(25, 118, 210, 0.2)",
              }}>
                <TableRow>
                  <TableCell sx={{ 
                    color: "#1565c0", 
                    fontWeight: "bold",
                    py: 2,
                  }}>ID</TableCell>
                  <TableCell sx={{ 
                    color: "#1565c0", 
                    fontWeight: "bold",
                    py: 2,
                  }}>Party Name</TableCell>
                  <TableCell sx={{ 
                    color: "#1565c0", 
                    fontWeight: "bold",
                    py: 2,
                  }}>Description</TableCell>
                  <TableCell sx={{ 
                    color: "#1565c0", 
                    fontWeight: "bold",
                    py: 2,
                  }}>Logo</TableCell>
                  <TableCell
                    sx={{ 
                      color: "#1565c0", 
                      fontWeight: "bold",
                      py: 2,
                    }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                      <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center"
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
                          <SearchIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="body1" color="text.secondary">
                          {searchTerm
                            ? "No matching parties found"
                            : "No parties available"}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredParties.map((party) => (
                    <TableRow
                      key={party.id}
                      hover
                      sx={{
                        "&:nth-of-type(odd)": { 
                          backgroundColor: "rgba(25, 118, 210, 0.02)",
                        },
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.05)",
                        },
                      }}
                    >
                      <TableCell>
                        <Chip
                          label={party.id}
                          size="small"
                          variant="outlined"
                          color="primary"
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
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium" color="#1565c0">
                          {party.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {party.description || "No description"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {party.logo ? (
                          <Avatar
                            src={`data:image/png;base64,${party.logo}`}
                            alt={party.name}
                            variant="rounded"
                            sx={{ 
                              width: 50, 
                              height: 50,
                              border: '1px solid rgba(25, 118, 210, 0.2)',
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                        ) : (
                          <Avatar
                            variant="rounded"
                            sx={{ 
                              width: 50, 
                              height: 50, 
                              bgcolor: "primary.light",
                              color: "primary.main",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          >
                            <UploadIcon />
                          </Avatar>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(party)}
                          sx={{
                            p: 0.5,
                            mr: 1,
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(party.id)}
                          sx={{
                            p: 0.5,
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      {/* Add/Edit Party Dialog */}
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
            {editingParty ? "Edit Party" : "Add Party"}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <PartyForm
            onPartySaved={handlePartySaved}
            editingParty={editingParty}
            onCancelEdit={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PartyList;