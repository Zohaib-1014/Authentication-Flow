// frontend/src/admin/UsersList.js
import React from 'react';
import Card from '../components/Card';
import UserActions from './UserActions';

function UsersList(props) {
  const { 
    users, 
    currentUserEmail, 
    onBlockUser, 
    onUnblockUser, 
    onMakeAdmin, 
    onRemoveAdmin, 
    actionLoading 
  } = props;

  const getStatusBadge = (status, type) => {
    let badgeClass, text;
        
    switch (type) {
      case 'active':
        badgeClass = status ? 'badge bg-success' : 'badge bg-secondary';
        text = status ? 'Active' : 'Inactive';
        break;
      case 'verified':
        badgeClass = status ? 'badge bg-primary' : 'badge bg-warning';
        text = status ? 'Verified' : 'Pending';
        break;
      case 'blocked':
        badgeClass = status ? 'badge bg-danger' : 'badge bg-success';
        text = status ? 'Blocked' : 'Not Blocked';
        break;
      default:
        badgeClass = 'badge bg-secondary';
        text = 'Unknown';
    }
    
    return (
      <span className={badgeClass}>
        {text}
      </span>
    );
  };

  if (!users || users.length === 0) {
    return (
      <Card>
        <div className="text-center py-4">
          <h5>No users found</h5>
          <p className="text-muted">There are no users to display.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="card-header">
        <h5 className="card-title mb-0">Users Management</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Status</th>
                <th>Verified</th>
                <th>Blocked</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.id}</td>
                  <td>
                    {user.email}
                    {user.email === currentUserEmail && (
                      <small className="text-muted ms-2">(You)</small>
                    )}
                  </td>
                  <td>{user.username || 'N/A'}</td>
                  <td>
                    <span className={`badge ${user.is_admin ? 'bg-warning' : 'bg-info'}`}>
                      {user.is_admin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td>{getStatusBadge(user.is_active, 'active')}</td>
                  <td>{getStatusBadge(user.is_verified, 'verified')}</td>
                  <td>{getStatusBadge(user.is_blocked, 'blocked')}</td>
                  <td>
                    {user.created_at 
                      ? new Date(user.created_at).toLocaleDateString()
                      : 'N/A'
                    }
                  </td>
                  <td>
                    <UserActions
                      user={user}
                      currentUserEmail={currentUserEmail}
                      onBlockUser={onBlockUser}
                      onUnblockUser={onUnblockUser}
                      onMakeAdmin={onMakeAdmin}
                      onRemoveAdmin={onRemoveAdmin}
                      actionLoading={actionLoading}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users.length > 0 && (
          <div className="mt-3">
            <small className="text-muted">
              Showing {users.length} user{users.length !== 1 ? 's' : ''}
            </small>
          </div>
        )}
      </div>
    </Card>
  );
}

export default UsersList;