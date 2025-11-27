import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const CardParty = ({ party, onEditClick, onDeleteClick }) => {
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
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Avatar
          src={party.logo ? `data:image/png;base64,${party.logo}` : "/default-logo.png"}
          alt={party.name}
          sx={{ 
            width: 80, 
            height: 80, 
            mb: 2,
            border: '2px solid rgba(25, 118, 210, 0.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
            },
          }}
        />
        
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
          {party.name}
        </Typography>
        
        {party.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center" 
            mb={3}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {party.description}
          </Typography>
        )}
        
        <Box display="flex" gap={1} mt="auto">
          {onEditClick && (
            <IconButton
              color="primary"
              onClick={onEditClick}
              sx={{
                p: 0.5,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          {onDeleteClick && (
            <IconButton
              color="error"
              onClick={onDeleteClick}
              sx={{
                p: 0.5,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardParty;