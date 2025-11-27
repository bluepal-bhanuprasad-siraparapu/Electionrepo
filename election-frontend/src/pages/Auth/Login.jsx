// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { HowToVote as ElectionIcon } from "@mui/icons-material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
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
  padding: '12px 24px',
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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      
      const { token, role, voterId, username, email: userEmail } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("voterId", voterId);
      localStorage.setItem("username", username);
      localStorage.setItem("email", userEmail);
      
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "VOTER") navigate("/voter/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
          <GlassPaper sx={{ p: 5 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ElectionIcon sx={{ fontSize: 48, color: '#1976d2', mr: 2 }} />
                </motion.div>
                <Typography 
                  variant="h3" 
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
                variant="h5" 
                sx={{ mb: 4, textAlign: 'center', color: '#1976d2' }}
              >
                Secure Sign In
              </Typography>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                    {error}
                  </Alert>
                </motion.div>
              )}
              
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#42a5f5' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
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
                  <GradientButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 3 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </GradientButton>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Box textAlign="center">
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => navigate("/register")}
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
                      Don't have an account? Sign Up
                    </Link>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </GlassPaper>
        </motion.div>
      </Container>
    </>
  );
};

export default Login;