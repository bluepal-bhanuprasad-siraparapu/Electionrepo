// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Badge,
  Lock,
  Visibility,
  VisibilityOff,
  HowToVote as ElectionIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

// Animated background with light blue gradient
const ParticleBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  background: `linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)`,
  
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    animation: 'move 20s linear infinite',
  },
  
  '@keyframes move': {
    '0%': { transform: 'translate(0, 0)' },
    '100%': { transform: 'translate(-50px, -50px)' },
  },
}));

// Glassmorphism paper with light blue tint
const GlassPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(144, 202, 249, 0.5)',
  boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)',
  overflow: 'hidden',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    background: `linear-gradient(90deg, #42a5f5, #64b5f6, #90caf9)`,
    animation: 'shimmer 2s infinite',
  },
  
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}));

// Light blue gradient button
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, #42a5f5, #90caf9)`,
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '50px',
  boxShadow: '0 4px 15px rgba(66, 165, 245, 0.3)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(66, 165, 245, 0.4)',
    background: `linear-gradient(45deg, #1e88e5, #64b5f6)`,
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '5px',
    height: '5px',
    background: 'rgba(255, 255, 255, 0.5)',
    opacity: 0,
    borderRadius: '100%',
    transform: 'scale(1, 1) translate(-50%)',
    transformOrigin: '50% 50%',
  },
  
  '&:focus::after': {
    animation: 'ripple 1s ease-out',
  },
  
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0, 0)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(20, 20)',
      opacity: 0,
    },
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    voterId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...formData, role: "VOTER" };
      await axiosConfig.post("/users/register", payload);
      navigate("/login", {
        state: {
          message: "Registration successful! Please login with your credentials.",
        },
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your information."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ParticleBackground />
      <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <GlassPaper sx={{ p: 3 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              {/* Logo + Title */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ElectionIcon sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                </motion.div>
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  color="#1565c0"
                  sx={{ textShadow: '0 2px 4px rgba(25, 118, 210, 0.2)' }}
                >
                  Election Hub
                </Typography>
              </Box>
              
              <Typography
                component="h2"
                variant="h6"
                sx={{ mb: 2, textAlign: "center", color: '#1976d2' }}
              >
                Create Your Account
              </Typography>
              
              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>
                    {error}
                  </Alert>
                </motion.div>
              )}
              
              {/* Registration Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0.5 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    name="username"
                    label="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        '&:hover fieldset': {
                          borderColor: '#42a5f5',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1976d2',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: '#42a5f5' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    name="email"
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        '&:hover fieldset': {
                          borderColor: '#42a5f5',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1976d2',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#42a5f5' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    name="voterId"
                    label="Voter ID Number"
                    value={formData.voterId}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        '&:hover fieldset': {
                          borderColor: '#42a5f5',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1976d2',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge sx={{ color: '#42a5f5' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        '&:hover fieldset': {
                          borderColor: '#42a5f5',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#1976d2',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#42a5f5' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            size="small"
                            sx={{ color: '#42a5f5' }}
                          >
                            {showPassword ? (
                              <VisibilityOff fontSize="small" />
                            ) : (
                              <Visibility fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <GradientButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Create Account"
                    )}
                  </GradientButton>
                </motion.div>
              </Box>
              
              {/* Sign In Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Box textAlign="center">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/login")}
                    sx={{ 
                      fontWeight: 'medium', 
                      color: '#1976d2',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#1565c0'
                      }
                    }}
                  >
                    Already have an account? Sign In
                  </Link>
                </Box>
              </motion.div>
            </motion.div>
          </GlassPaper>
        </motion.div>
      </Container>
    </>
  );
};

export default Register;