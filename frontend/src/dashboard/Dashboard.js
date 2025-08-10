// frontend/src/dashboard/Dashboard.js

import React, { Component } from 'react';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { getUserProfile } from '../utils/api';
import { getUserInfo } from '../utils/storage';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.loadUserProfile();
  }

  loadUserProfile = () => {
    const userInfo = getUserInfo();
    
    if (!userInfo.email) {
      this.setState({ 
        loading: false, 
        error: 'User information not found' 
      });
      return;
    }

    getUserProfile(userInfo.email)
      .then((userProfile) => {
        this.setState({ 
          userProfile: userProfile, 
          loading: false 
        });
      })
      .catch((error) => {
        console.error('Error loading user profile:', error);
        this.setState({ 
          loading: false, 
          error: error.message 
        });
      });
  }

  render() {
    const { userProfile, loading, error } = this.state;

    if (loading) {
      return <Loading show={true} fullPage={true} message="Loading your dashboard..." />;
    }

    if (error) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Alert type="danger" show={true}>
                <h5>Error Loading Dashboard</h5>
                <p>{error}</p>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={this.loadUserProfile}
                >
                  <i className="fas fa-refresh me-2"></i>
                  Try Again
                </button>
              </Alert>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2>
                  <i className="fas fa-tachometer-alt me-2 text-primary"></i>
                  Dashboard
                </h2>
                <p className="text-muted mb-0">
                  Welcome back, {userProfile?.username}!
                </p>
              </div>
              <div className="text-end">
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  Last updated: {new Date().toLocaleTimeString()}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* User Profile Section */}
          <div className="col-lg-8 mb-4">
            <UserProfile userProfile={userProfile} />
          </div>

          {/* Quick Stats Section */}
          <div className="col-lg-4 mb-4">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="card-title">Account Status</h6>
                        <h4 className="mb-0">
                          {userProfile?.is_active ? 'Active' : 'Inactive'}
                        </h4>
                      </div>
                      <div className="fs-1 opacity-75">
                        <i className="fas fa-user-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="card-title">Email Status</h6>
                        <h4 className="mb-0">
                          {userProfile?.is_verified ? 'Verified' : 'Pending'}
                        </h4>
                      </div>
                      <div className="fs-1 opacity-75">
                        <i className="fas fa-envelope-circle-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="card-title">User Role</h6>
                        <h4 className="mb-0 text-capitalize">
                          {userProfile?.role || 'User'}
                        </h4>
                      </div>
                      <div className="fs-1 opacity-75">
                        <i className="fas fa-user-tag"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="col-lg-6 mb-4">
            <ChangePassword />
          </div>

          {/* Quick Actions Section */}
          <div className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="fas fa-bolt me-2"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={this.loadUserProfile}
                  >
                    <i className="fas fa-refresh me-2"></i>
                    Refresh Profile
                  </button>
                  
                  {userProfile?.role === 'admin' && (
                    <button 
                      className="btn btn-outline-warning"
                      onClick={() => this.props.onPageChange('admin')}
                    >
                      <i className="fas fa-users-cog me-2"></i>
                      Admin Panel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;