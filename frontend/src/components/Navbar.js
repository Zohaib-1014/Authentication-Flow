// frontend/src/components/Navbar.js

import React from 'react';
import { getUserInfo, isUserLoggedIn, isUserAdmin, logoutUser } from '../utils/storage';

function Navbar(props) {
  const userInfo = getUserInfo();
  const isLoggedIn = isUserLoggedIn();
  const isAdmin = isUserAdmin();

  const handleLogout = () => {
    logoutUser();
    if (props.onLogout) {
      props.onLogout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={() => props.onPageChange('dashboard')}>
          <i className="fas fa-lock me-2"></i>
          Authentication Flow
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white" 
                    onClick={() => props.onPageChange('login')}
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white" 
                    onClick={() => props.onPageChange('signup')}
                  >
                    <i className="fas fa-user-plus me-1"></i>
                    Sign Up
                  </button>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-white" 
                    onClick={() => props.onPageChange('dashboard')}
                  >
                    <i className="fas fa-tachometer-alt me-1"></i>
                    Dashboard
                  </button>
                </li>
                
                {isAdmin && (
                  <li className="nav-item">
                    <button 
                      className="nav-link btn btn-link text-white" 
                      onClick={() => props.onPageChange('admin')}
                    >
                      <i className="fas fa-users-cog me-1"></i>
                      Admin Panel
                    </button>
                  </li>
                )}

                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle text-white" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                  >
                    <i className="fas fa-user me-1"></i>
                    {userInfo.email}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={() => props.onPageChange('dashboard')}
                      >
                        <i className="fas fa-user me-2"></i>
                        Profile
                      </button>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;