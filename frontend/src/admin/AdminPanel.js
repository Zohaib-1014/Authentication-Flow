// frontend/src/admin/AdminPanel.js

import React, { Component } from 'react';
import AdminStats from './AdminStats';
import UsersList from './UsersList';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { 
  getAdminUsers, 
  blockUser, 
  unblockUser, 
  makeUserAdmin, 
  removeUserAdmin 
} from '../utils/api';
import { getUserInfo } from '../utils/storage';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      actionLoading: null, // Email of user being acted upon
      alert: {
        show: false,
        type: '',
        message: ''
      }
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  showAlert = (type, message) => {
    this.setState({
      alert: {
        show: true,
        type: type,
        message: message
      }
    });

    // Auto hide success alerts
    if (type === 'success') {
      setTimeout(() => {
        this.hideAlert();
      }, 3000);
    }
  }

  hideAlert = () => {
    this.setState({
      alert: {
        show: false,
        type: '',
        message: ''
      }
    });
  }

  loadUsers = () => {
    this.setState({ loading: true });
    
    getAdminUsers()
      .then((users) => {
        this.setState({ 
          users: users, 
          loading: false 
        });
      })
      .catch((error) => {
        console.error('Error loading users:', error);
        this.setState({ 
          loading: false 
        });
        this.showAlert('danger', 'Error loading users: ' + error.message);
      });
  }

  handleBlockUser = (email) => {
    this.setState({ actionLoading: email });
    this.hideAlert();

    blockUser(email)
      .then((response) => {
        this.setState({ actionLoading: null });
        this.showAlert('success', response.message);
        this.loadUsers(); // Reload users
      })
      .catch((error) => {
        this.setState({ actionLoading: null });
        this.showAlert('danger', error.message);
      });
  }

  handleUnblockUser = (email) => {
    this.setState({ actionLoading: email });
    this.hideAlert();

    unblockUser(email)
      .then((response) => {
        this.setState({ actionLoading: null });
        this.showAlert('success', response.message);
        this.loadUsers(); // Reload users
      })
      .catch((error) => {
        this.setState({ actionLoading: null });
        this.showAlert('danger', error.message);
      });
  }

  handleMakeAdmin = (email) => {
    this.setState({ actionLoading: email });
    this.hideAlert();

    makeUserAdmin(email)
      .then((response) => {
        this.setState({ actionLoading: null });
        this.showAlert('success', response.message);
        this.loadUsers(); // Reload users
      })
      .catch((error) => {
        this.setState({ actionLoading: null });
        this.showAlert('danger', error.message);
      });
  }

  handleRemoveAdmin = (email) => {
    this.setState({ actionLoading: email });
    this.hideAlert();

    removeUserAdmin(email)
      .then((response) => {
        this.setState({ actionLoading: null });
        this.showAlert('success', response.message);
        this.loadUsers(); // Reload users
      })
      .catch((error) => {
        this.setState({ actionLoading: null });
        this.showAlert('danger', error.message);
      });
  }

  render() {
    const { users, loading, actionLoading, alert } = this.state;
    const currentUserInfo = getUserInfo();

    if (loading) {
      return <Loading show={true} fullPage={true} message="Loading admin panel..." />;
    }

    return (
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2>
                  <i className="fas fa-users-cog me-2 text-warning"></i>
                  Admin Panel
                </h2>
                <p className="text-muted mb-0">
                  Manage users and system settings
                </p>
              </div>
              <div>
                <Button
                  variant="outline-primary"
                  onClick={this.loadUsers}
                  disabled={loading}
                  icon="fas fa-refresh"
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="row">
          <div className="col-12">
            <Alert
              show={alert.show}
              type={alert.type}
              dismissible={true}
              onClose={this.hideAlert}
            >
              {alert.message}
            </Alert>
          </div>
        </div>

        {/* Statistics */}
        <AdminStats users={users} />

        {/* Users List */}
        <div className="row">
          <div className="col-12">
            <UsersList
              users={users}
              currentUserEmail={currentUserInfo.email}
              onBlockUser={this.handleBlockUser}
              onUnblockUser={this.handleUnblockUser}
              onMakeAdmin={this.handleMakeAdmin}
              onRemoveAdmin={this.handleRemoveAdmin}
              actionLoading={actionLoading}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-4">
                    <i className="fas fa-shield-alt fa-2x text-primary mb-2"></i>
                    <h6>Secure Management</h6>
                    <small className="text-muted">All admin actions are logged and secure</small>
                  </div>
                  <div className="col-md-4">
                    <i className="fas fa-clock fa-2x text-success mb-2"></i>
                    <h6>Real-time Updates</h6>
                    <small className="text-muted">User data is updated in real-time</small>
                  </div>
                  <div className="col-md-4">
                    <i className="fas fa-users fa-2x text-info mb-2"></i>
                    <h6>User Management</h6>
                    <small className="text-muted">Complete control over user accounts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;