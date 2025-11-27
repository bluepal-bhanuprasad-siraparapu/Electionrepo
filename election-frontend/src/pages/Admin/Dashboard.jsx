// src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  HowToVote as ElectionIcon,
  Person as CandidateIcon,
  Group as UserIcon,
  TrendingUp as StatsIcon,
} from "@mui/icons-material";

const COLORS = ["#1976d2", "#64b5f6", "#90caf9", "#bbdefb"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalElections: 0,
    totalCandidates: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [electionsRes, candidatesRes, usersRes] = await Promise.all([
        axiosConfig.get("/elections"),
        axiosConfig.get("/candidates"),
        axiosConfig.get("/users"),
      ]);
      
      setStats({
        totalElections: electionsRes.data.length,
        totalCandidates: candidatesRes.data.length,
        totalUsers: usersRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: "Elections", value: stats.totalElections },
    { name: "Candidates", value: stats.totalCandidates },
    { name: "Users", value: stats.totalUsers },
  ];

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: 4,
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)',
        border: '1px solid rgba(25, 118, 210, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)',
          '& .card-icon': {
            transform: 'scale(1.1)',
          },
          '& .card-bg': {
            opacity: 0.1,
          },
        },
      }}
      onClick={onClick}
    >
      <Box className="card-bg" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color,
        opacity: 0.05,
        transition: 'opacity 0.3s ease',
      }} />
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Box display="flex" alignItems="center">
          <Avatar 
            className="card-icon"
            sx={{ 
              width: 56, 
              height: 56, 
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
              mr: 2,
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              color={`${color}.main`}
              sx={{ transition: 'color 0.3s ease' }}
            >
              {value}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              fontWeight={500}
            >
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

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
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h3" 
        component="h1" 
        fontWeight="bold" 
        mb={4}
        color="#1565c0"
        sx={{ 
          position: 'relative',
          display: 'inline-block',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 60,
            height: 4,
            backgroundColor: '#1976d2',
            borderRadius: 2,
          },
        }}
      >
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Elections"
            value={stats.totalElections}
            icon={<ElectionIcon fontSize="large" />}
            color="primary"
            onClick={() => navigate("/admin/elections")}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Candidates"
            value={stats.totalCandidates}
            icon={<CandidateIcon fontSize="large" />}
            color="secondary"
            onClick={() => navigate("/admin/candidates")}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<UserIcon fontSize="large" />}
            color="success"
            onClick={() => navigate("/admin/users")}
          />
        </Grid>
      </Grid>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)',
          border: '1px solid rgba(25, 118, 210, 0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #1976d2, #64b5f6, #90caf9)',
          }}
        />
        
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              backgroundColor: 'primary.light',
              color: 'primary.main',
              mr: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <StatsIcon fontSize="large" />
          </Avatar>
          <Typography 
            variant="h4" 
            component="h2" 
            fontWeight="bold"
            color="#1565c0"
          >
            Overview
          </Typography>
        </Box>
        
        <Box height={350}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                animationDuration={1000}
                animationBegin={0}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'Count']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 12,
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => (
                  <span style={{ color: '#37474f', fontWeight: 500 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;