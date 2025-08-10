// frontend/src/App.js

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Login from './login/Login';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';
import AdminPanel from './admin/AdminPanel';
import ResetPassword from './reset-password/ResetPassword';
import Loading from './components/Loading';
import { isUserLoggedIn, isUserAdmin, getUserInfo } from './utils/storage';
import { PAGES } from './utils/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGES.LOGIN,
      loading: true
    };
  }

  componentDidMount() {
    // Check if user is logged in and set appropriate page
    this.initializeApp();
  }

  initializeApp = () => {
    setTimeout(() => {
      if (isUserLoggedIn()) {
        this.setState({ 
          currentPage: PAGES.DASHBOARD,
          loading: false 
        });
      } else {
        this.setState({ 
          currentPage: PAGES.LOGIN,
          loading: false 
        });
      }
    }, 1000); // Small delay to show loading
  }

  handlePageChange = (page) => {
    // Check permissions for admin page
    if (page === PAGES.ADMIN && !isUserAdmin()) {
      alert('Admin access required!');
      return;
    }

    // Check if user needs to be logged in for certain pages
    const protectedPages = [PAGES.DASHBOARD, PAGES.ADMIN];
    if (protectedPages.includes(page) && !isUserLoggedIn()) {
      this.setState({ currentPage: PAGES.LOGIN });
      return;
    }

    this.setState({ currentPage: page });
  }

  handleLoginSuccess = () => {
    this.setState({ currentPage: PAGES.DASHBOARD });
  }

  handleLogout = () => {
    this.setState({ currentPage: PAGES.LOGIN });
  }

  renderCurrentPage = () => {
    const { currentPage } = this.state;

    switch (currentPage) {
      case PAGES.LOGIN:
        return (
          <Login 
            onPageChange={this.handlePageChange}
            onLoginSuccess={this.handleLoginSuccess}
          />
        );

      case PAGES.SIGNUP:
        return (
          <Signup 
            onPageChange={this.handlePageChange}
          />
        );

      case PAGES.DASHBOARD:
        if (!isUserLoggedIn()) {
          return (
            <Login 
              onPageChange={this.handlePageChange}
              onLoginSuccess={this.handleLoginSuccess}
            />
          );
        }
        return (
          <Dashboard 
            onPageChange={this.handlePageChange}
          />
        );

      case PAGES.ADMIN:
        if (!isUserLoggedIn() || !isUserAdmin()) {
          return (
            <Login 
              onPageChange={this.handlePageChange}
              onLoginSuccess={this.handleLoginSuccess}
            />
          );
        }
        return (
          <AdminPanel 
            onPageChange={this.handlePageChange}
          />
        );

      case PAGES.RESET_PASSWORD:
        return (
          <ResetPassword 
            onPageChange={this.handlePageChange}
          />
        );

      default:
        return (
          <Login 
            onPageChange={this.handlePageChange}
            onLoginSuccess={this.handleLoginSuccess}
          />
        );
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading 
          show={true} 
          fullPage={true} 
          message="Loading Authentication Flow..." 
        />
      );
    }

    const showNavbar = isUserLoggedIn();

    return (
      <div className="App">
        {showNavbar && (
          <Navbar 
            onPageChange={this.handlePageChange}
            onLogout={this.handleLogout}
          />
        )}
        
        <main className={showNavbar ? '' : 'min-vh-100'}>
          {this.renderCurrentPage()}
        </main>

        {/* Footer for non-authenticated pages */}
        {!showNavbar && (
          <footer className="bg-dark text-white text-center py-3">
            <div className="container">
              <p className="mb-0">
                <i className="fas fa-lock me-2"></i>
                Authentication Flow - Secure User Management System
              </p>
              <small className="text-muted">
                Built with FastAPI and React | &copy; 2024
              </small>
            </div>
          </footer>
        )}
      </div>
    );
  }
}

export default App;