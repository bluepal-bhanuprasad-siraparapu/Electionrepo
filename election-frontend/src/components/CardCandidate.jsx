import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CardCandidate = ({ candidate, onEditClick, onDeleteClick }) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: 4,
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
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
      
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Avatar
          src={
            candidate.photo
              ? `data:image/png;base64,${candidate.photo}`
              : "/default-avatar.png"
          }
          alt={candidate.name}
          sx={{ 
            width: 100, 
            height: 100, 
            border: '2px solid rgba(25, 118, 210, 0.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 3, pt: 0 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          fontWeight="bold" 
          textAlign="center" 
          mb={1}
          color="#1565c0"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#1976d2",
            },
          }}
        >
          {candidate.name}
        </Typography>
        
        {candidate.party && (
          <Box display="flex" justifyContent="center" mb={2}>
            <Chip 
              label={candidate.party.name} 
              color="primary" 
              variant="outlined"
              size="small"
              sx={{
                fontWeight: 500,
                borderRadius: 12,
                height: 28,
                px: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                },
              }}
            />
          </Box>
        )}
        
        {candidate.election && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center" 
            mb={2}
            fontWeight={500}
          >
            <strong>Election:</strong> {candidate.election.title}
          </Typography>
        )}
        
        {candidate.bio && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            mb={3}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {candidate.bio}
          </Typography>
        )}
        
        <Box display="flex" justifyContent="center" gap={1} mt="auto">
          <IconButton
            color="primary"
            onClick={() => onEditClick(candidate)}
            sx={{
              p: 0.5,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Edit />
          </IconButton>
          
          {/* {onDeleteClick && (
            <IconButton
              color="error"
              onClick={() => onDeleteClick(candidate.id)}
              sx={{
                p: 0.5,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Delete />
            </IconButton>
          )} */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardCandidate;