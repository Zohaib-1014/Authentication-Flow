// frontend/src/dashboard/UserProfile.js

import React from 'react';
import Card from '../components/Card';

function UserProfile(props) {
  const { userProfile } = props;

  if (!userProfile) {
    return (
      <Card title="User Profile" titleIcon="fas fa-user">
        <p className="text-muted">Loading profile information...</p>
      </Card>
    );
  }

  const getStatusBadge = (status, label) => {
    const badgeClass = status ? 'badge bg-success' : 'badge bg-danger';
    const statusText = status ? 'Active' : 'Inactive';
    return <span className={badgeClass}>{statusText}</span>;
  };

  const getRoleBadge = (role) => {
    const badgeClass = role === 'admin' ? 'badge bg-primary' : 'badge bg-secondary';
    const roleText = role === 'admin' ? 'Administrator' : 'User';
    return <span className={badgeClass}>{roleText}</span>;
  };

  return (
    <Card title="User Profile" titleIcon="fas fa-user">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label text-muted">User ID</label>
            <div className="fw-bold">#{userProfile.id}</div>
          </div>
          
          <div className="mb-3">
            <label className="form-label text-muted">Email Address</label>
            <div className="fw-bold">
              <i className="fas fa-envelope me-2 text-primary"></i>
              {userProfile.email}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Username</label>
            <div className="fw-bold">
              <i className="fas fa-user me-2 text-primary"></i>
              {userProfile.username}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label text-muted">Account Status</label>
            <div>
              {getStatusBadge(userProfile.is_active, 'Active')}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Email Verification</label>
            <div>
              {getStatusBadge(userProfile.is_verified, 'Verified')}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">User Role</label>
            <div>
              {getRoleBadge(userProfile.role)}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Member Since</label>
            <div className="fw-bold">
              <i className="fas fa-calendar me-2 text-primary"></i>
              {new Date(userProfile.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {userProfile.is_blocked && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-ban me-2"></i>
          <strong>Account Blocked:</strong> Your account has been blocked by an administrator.
        </div>
      )}
    </Card>
  );
}

export default UserProfile;