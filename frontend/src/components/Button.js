// frontend/src/components/Button.js

import React from 'react';

function Button(props) {
  const getButtonClass = () => {
    let baseClass = 'btn';
    
    // Button variant (color)
    if (props.variant) {
      baseClass += ` btn-${props.variant}`;
    } else {
      baseClass += ' btn-primary';
    }
    
    // Button size
    if (props.size) {
      baseClass += ` btn-${props.size}`;
    }
    
    // Full width
    if (props.fullWidth) {
      baseClass += ' w-100';
    }
    
    // Additional classes
    if (props.className) {
      baseClass += ` ${props.className}`;
    }
    
    return baseClass;
  };

  return (
    <button
      type={props.type || 'button'}
      className={getButtonClass()}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {props.loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status">
        </span>
      )}
      {props.icon && (
        <i className={`${props.icon} me-2`}></i>
      )}
      {props.children}
    </button>
  );
}

export default Button;