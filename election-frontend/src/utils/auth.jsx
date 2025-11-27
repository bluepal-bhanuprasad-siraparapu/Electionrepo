// src/utils/auth.js
export const logout = () => {
  localStorage.removeItem("token"); // remove token
  localStorage.removeItem("role");  // if you're storing role
  window.location.href = "/login";  // force redirect to login
};
