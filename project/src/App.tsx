import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { initializeStorage } from './lib/storage';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import ShipInventory from './pages/ShipInventory';
import MaintenanceTasks from './pages/MaintenanceTasks';
import MaintenanceCalendar from './pages/MaintenanceCalendar';
import ShipDetails from './pages/ShipDetails';

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeStorage();
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
        } />
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ships" element={<ShipInventory />} />
          <Route path="/ships/:id" element={<ShipDetails />} />
          <Route path="/tasks" element={<MaintenanceTasks />} />
          <Route path="/calendar" element={<MaintenanceCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;