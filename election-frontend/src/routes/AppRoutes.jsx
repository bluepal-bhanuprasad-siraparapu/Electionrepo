import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import ElectionList from "../pages/Admin/ElectionList";
import CandidateList from "../pages/Admin/CandidateList";
import AllowedVoters from "../pages/Admin/AllowedVoters";
import PartyList from "../pages/Admin/PartyList";
import AdminResults from "../pages/Admin/AdminResults";

// Voter Pages
import VoterDashboard from "../pages/Voter/Dashboard";
import VoterElectionList from "../pages/Voter/ElectionList";
import VotePage from "../pages/Voter/VotePage";
import VoterResults from "../pages/Voter/VoterResults";
import ParticipatedElections from "../pages/Voter/ParticipatedElections";

// Layouts & Components
import ProtectedRoute from "../components/ProtectedRoute ";
import AdminLayout from "../layouts/AdminLayout ";
import VoterLayout from "../layouts/VoterLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Root → redirect to Elections */}
      <Route path="/admin" element={<Navigate to="/admin/elections" replace />} />

      {/* Admin with Layout */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/elections"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <ElectionList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/candidates"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <CandidateList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/allowed-voters"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <AllowedVoters />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/parties"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <PartyList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/results"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <AdminResults />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Voter with Layout (nested with Outlet) */}
      <Route
        path="/voter"
        element={
          <ProtectedRoute allowedRoles={["VOTER"]}>
            <VoterLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<VoterDashboard />} />
        <Route path="elections" element={<VoterElectionList />} />
        <Route path="vote/:electionId" element={<VotePage />} />

        {/* 🔹 Fix: Results flow */}
        <Route path="results" element={<ParticipatedElections />} />
        <Route path="results/:electionId" element={<VoterResults />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
