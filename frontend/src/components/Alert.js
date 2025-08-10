// frontend/src/components/Alert.js

import React from 'react';

function Alert(props) {
  if (!props.show) {
    return null;
  }

  const getAlertClass = () => {
    let baseClass = 'alert';
    
    // Alert type (success, danger, warning, info)
    if (props.type) {
      baseClass += ` alert-${props.type}`;
    } else {
      baseClass += ' alert-info';
    }
    
    // Dismissible
    if (props.dismissible) {
      baseClass += ' alert-dismissible fade show';
    }
    
    return baseClass;
  };

  const getIcon = () => {
    switch (props.type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <div className={getAlertClass()} role="alert">
      <i className={`${getIcon()} me-2`}></i>
      {props.children}
      {props.dismissible && (
        <button
          type="button"
          className="btn-close"
          onClick={props.onClose}
        ></button>
      )}
    </div>
  );
}

export default Alert;