// src/utils/helpers.js

// ------------------ Format Date ------------------
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ------------------ Format Date & Time ------------------
export const formatDateTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ------------------ Role Check ------------------
export const isAdmin = () => localStorage.getItem("role") === "ADMIN";
export const isVoter = () => localStorage.getItem("role") === "VOTER";

// ------------------ Local Storage Helpers ------------------
export const saveUserData = (token, role, username) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("username", username);
};

export const clearUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};

// ------------------ Token Helpers ------------------
export const getToken = () => localStorage.getItem("token");

// Check if token exists, otherwise redirect to login
export const checkAuth = (navigate) => {
  const token = getToken();
  if (!token && navigate) {
    navigate("/login", { replace: true });
  }
};

// ------------------ Alert / Toast Helper ------------------
export const showAlert = (message, type = "info") => {
  // type: success, error, warning, info
  // You can replace alert with a toast library like react-toastify later
  alert(`${type.toUpperCase()}: ${message}`);
};

// ------------------ Truncate Text Helper ------------------
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// ------------------ Example: Role-based redirect ------------------
export const redirectToDashboard = (role, navigate) => {
  if (!role || !navigate) return;
  if (role === "ADMIN") navigate("/admin/dashboard", { replace: true });
  else if (role === "VOTER") navigate("/voter/dashboard", { replace: true });
};
