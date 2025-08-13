"use client"
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          E-Commerce
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Products
          </Link>
          {user ? (
            <>
              {user.role === 'merchant' && (
                <Link to="/merchant-dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              <span className="nav-link">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
