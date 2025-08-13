"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from '../Components/Navbar';
import Login from '../Components/Login';
import Register from '../Components/Register';
import ProductList from '../Components/ProductList';
import MerchantDashboard from '../Components/MerchantDashboard';
import '../App.css';

function App() {
  return (
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
  );
}

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default App;
