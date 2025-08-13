"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../app/context/AuthContext';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import ProductList from './ProductList';
import MerchantDashboard from './MerchantDashboard';
import '../App.css'

function MainApp() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/merchant-dashboard" 
                element={
                  <ProtectedRoute role="merchant">
                    <MerchantDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default MainApp;
