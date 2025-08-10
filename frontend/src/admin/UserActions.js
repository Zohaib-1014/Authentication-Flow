// frontend/src/admin/UserActions.js

import React from 'react';
import Button from '../components/Button';

function UserActions(props) {
  const { user, currentUserEmail, onBlockUser, onUnblockUser, onMakeAdmin, onRemoveAdmin, loading } = props;

  // Don't allow actions on current user
  const isCurrentUser = user.email === currentUserEmail;

  return (
    <div className="btn-group-vertical gap-1" style={{ width: '100%' }}>
      {/* Block/Unblock User */}
      {!user.is_blocked ? (
        <Button
          variant="outline-danger"
          size="sm"
          disabled={isCurrentUser || loading}
          onClick={() => onBlockUser(user.email)}
          icon="fas fa-ban"
        >
          {loading ? 'Blocking...' : 'Block User'}
        </Button>
      ) : (
        <Button
          variant="outline-success"
          size="sm"
          disabled={isCurrentUser || loading}
          onClick={() => onUnblockUser(user.email)}
          icon="fas fa-check-circle"
        >
          {loading ? 'Unblocking...' : 'Unblock User'}
        </Button>
      )}

      {/* Make Admin/Remove Admin */}
      {user.role !== 'admin' ? (
        <Button
          variant="outline-warning"
          size="sm"
          disabled={isCurrentUser || loading}
          onClick={() => onMakeAdmin(user.email)}
          icon="fas fa-user-shield"
        >
          {loading ? 'Promoting...' : 'Make Admin'}
        </Button>
      ) : (
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={isCurrentUser || loading}
          onClick={() => onRemoveAdmin(user.email)}
          icon="fas fa-user-minus"
        >
          {loading ? 'Removing...' : 'Remove Admin'}
        </Button>
      )}

      {isCurrentUser && (
        <small className="text-muted text-center mt-1">
          <i className="fas fa-info-circle me-1"></i>
          Current User
        </small>
      )}
    </div>
  );
}

export default UserActions;