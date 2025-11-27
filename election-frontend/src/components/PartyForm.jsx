import React, { useState, useEffect } from "react";
import axiosConfig from "../api/axiosConfig";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Cancel as CancelIcon,
  PhotoCamera as CameraIcon,
  Add as AddIcon,
} from "@mui/icons-material";

export default function PartyForm({ onPartySaved, editingParty, onCancelEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingParty) {
      setName(editingParty.name || "");
      setDescription(editingParty.description || "");
      setLogo(editingParty.logo || null);
      setPreview(
        editingParty.logo ? `data:image/png;base64,${editingParty.logo}` : null
      );
    } else {
      resetForm();
    }
  }, [editingParty]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setLogo(base64String);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setLogo(null);
    setPreview(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { name, description, logo };
      let response;
      if (editingParty) {
        response = await axiosConfig.put(`/parties/${editingParty.id}`, payload);
      } else {
        response = await axiosConfig.post("/parties", payload);
      }
      onPartySaved(response.data);
      resetForm();
    } catch (err) {
      console.error("Error saving party:", err);
      setError("Failed to save party. Are you logged in as ADMIN?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
        border: "1px solid rgba(25, 118, 210, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
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
        {editingParty ? "Edit Party" : "Create New Party"}
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2, 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {error}
        </Alert>
      )}
      
      {/* Party Name */}
      <TextField
        fullWidth
        label="Party Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ 
          mb: 2,
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
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar sx={{ width: 32, height: 32, backgroundColor: 'primary.light' }}>
                🏛️
              </Avatar>
            </InputAdornment>
          ),
        }}
      />
      
      {/* Description */}
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        sx={{ 
          mb: 3,
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
        variant="outlined"
        placeholder="Enter party description..."
      />
      
      {/* Logo Upload */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <Avatar
          src={preview}
          alt="Party Logo"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            bgcolor: "grey.200",
            border: "2px dashed rgba(25, 118, 210, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": { 
              borderColor: "primary.main",
              transform: "scale(1.02)",
            },
          }}
        >
          {!preview && <CameraIcon fontSize="large" color="primary" />}
        </Avatar>
        
        <input
          accept="image/*"
          id="logo-upload"
          type="file"
          onChange={handleLogoChange}
          style={{ display: "none" }}
        />
        
        <label htmlFor="logo-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<UploadIcon />}
            sx={{ 
              borderRadius: 20,
              fontWeight: 500,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {editingParty ? "Change Logo" : "Upload Logo"}
          </Button>
        </label>
        
        <Typography
          variant="caption"
          display="block"
          mt={1}
          color="text.secondary"
        >
          Recommended: Square image, max 2MB
        </Typography>
      </Box>
      
      {/* Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        {editingParty && (
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onCancelEdit}
            startIcon={<CancelIcon />}
            sx={{
              borderRadius: 20,
              fontWeight: 500,
              px: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />
          }
          sx={{ 
            px: 3,
            borderRadius: 20,
            fontWeight: 500,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {loading
            ? "Saving..."
            : editingParty
            ? "Update Party"
            : "Create Party"}
        </Button>
      </Box>
    </Box>
  );
}