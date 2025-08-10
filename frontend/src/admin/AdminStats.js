// frontend/src/admin/AdminStats.js

import React from 'react';

function AdminStats(props) {
  const { users } = props;

  if (!users || users.length === 0) {
    return null;
  }

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.is_active).length;
  const verifiedUsers = users.filter(user => user.is_verified).length;
  const blockedUsers = users.filter(user => user.is_blocked).length;
  const adminUsers = users.filter(user => user.role === 'admin').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: 'fas fa-users',
      color: 'primary',
      description: 'All registered users'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: 'fas fa-user-check',
      color: 'success',
      description: 'Users with active accounts'
    },
    {
      title: 'Verified Users',
      value: verifiedUsers,
      icon: 'fas fa-envelope-circle-check',
      color: 'info',
      description: 'Users with verified emails'
    },
    {
      title: 'Blocked Users',
      value: blockedUsers,
      icon: 'fas fa-user-slash',
      color: 'danger',
      description: 'Users that are blocked'
    },
    {
      title: 'Administrators',
      value: adminUsers,
      icon: 'fas fa-user-shield',
      color: 'warning',
      description: 'Users with admin privileges'
    }
  ];

  return (
    <div className="row mb-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-lg-2 col-md-4 col-sm-6 mb-3">
          <div className={`card text-white bg-${stat.color}`}>
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <div className="fs-6 fw-bold">{stat.title}</div>
                  <div className="fs-3 fw-bold">{stat.value}</div>
                </div>
                <div className="fs-1 opacity-75">
                  <i className={stat.icon}></i>
                </div>
              </div>
              <div className="mt-2">
                <small className="opacity-75">{stat.description}</small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;