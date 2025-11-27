import React, { useState, useEffect } from "react";
import axiosConfig from "../api/axiosConfig";
import {
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material";
import { CloudUpload, Edit, Add } from "@mui/icons-material";

const CandidateForm = ({ onCandidateSaved, editingCandidate }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    partyId: "",
    electionId: "",
    photo: null,
  });
  const [parties, setParties] = useState([]);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchParties();
    fetchElections();
  }, []);

  useEffect(() => {
    if (editingCandidate) {
      setFormData({
        name: editingCandidate.name || "",
        bio: editingCandidate.bio || "",
        partyId: editingCandidate.party?.id || "",
        electionId: editingCandidate.election?.id || "",
        photo: null,
      });
      if (editingCandidate.photo) {
        setPreview(`data:image/png;base64,${editingCandidate.photo}`);
      }
    } else {
      resetForm();
    }
  }, [editingCandidate]);

  const fetchParties = async () => {
    try {
      const res = await axiosConfig.get("/parties");
      setParties(res.data);
    } catch {
      setError("Failed to fetch parties");
    }
  };

  const fetchElections = async () => {
    try {
      const res = await axiosConfig.get("/elections");
      setElections(res.data);
    } catch {
      setError("Failed to fetch elections");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, photo: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let photoBytes = null;
      if (formData.photo) {
        const buffer = await toBase64(formData.photo);
        photoBytes = Array.from(new Uint8Array(buffer));
      }
      const payload = {
        name: formData.name,
        bio: formData.bio,
        partyId: Number(formData.partyId),
        electionId: Number(formData.electionId),
        photo: photoBytes,
      };
      if (editingCandidate) {
        await axiosConfig.put(`/candidates/${editingCandidate.id}`, payload);
      } else {
        await axiosConfig.post("/candidates", payload);
      }
      resetForm();
      if (onCandidateSaved) onCandidateSaved();
    } catch {
      setError("Failed to save candidate");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      bio: "",
      partyId: "",
      electionId: "",
      photo: null,
    });
    setPreview(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ 
        maxWidth: 380, 
        mx: "auto",
        p: 2,
        borderRadius: 4,
        background: "linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)",
        border: "1px solid rgba(25, 118, 210, 0.1)",
      }}
    >
      <CardContent sx={{ p: 1 }}>
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
        
        {/* Candidate Name */}
        <TextField
          fullWidth
          margin="normal"
          label="Candidate Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
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
        />
        
        {/* Party Dropdown */}
        <FormControl 
          fullWidth 
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
        >
          <InputLabel>Party</InputLabel>
          <Select
            name="partyId"
            value={formData.partyId}
            onChange={handleChange}
            label="Party"
          >
            {parties.map((party) => (
              <MenuItem key={party.id} value={party.id}>
                {party.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Election Dropdown */}
        <FormControl 
          fullWidth 
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
        >
          <InputLabel>Election</InputLabel>
          <Select
            name="electionId"
            value={formData.electionId}
            onChange={handleChange}
            label="Election"
          >
            {elections.map((election) => (
              <MenuItem key={election.id} value={election.id}>
                {election.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Photo Upload */}
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar
            src={preview}
            alt="Preview"
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              border: '2px solid rgba(25, 118, 210, 0.2)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <label htmlFor="photo-upload">
            <input
              id="photo-upload"
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUpload />}
              size="small"
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
              {editingCandidate ? "Change Photo" : "Upload Photo"}
            </Button>
          </label>
        </Box>
        
        {/* Bio */}
        <TextField
          fullWidth
          margin="normal"
          label="Candidate Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          multiline
          rows={3}
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
        />
        
        {/* Submit Button */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} />
              ) : editingCandidate ? (
                <Edit />
              ) : (
                <Add />
              )
            }
            sx={{ 
              py: 1, 
              px: 4,
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
              : editingCandidate
              ? "Update Candidate"
              : "Add Candidate"}
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CandidateForm;