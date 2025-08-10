// frontend/src/components/Card.js

import React from 'react';

function Card(props) {
  return (
    <div className={`card ${props.className || ''}`}>
      {props.header && (
        <div className="card-header">
          {props.headerIcon && (
            <i className={`${props.headerIcon} me-2`}></i>
          )}
          {props.header}
        </div>
      )}
      
      <div className="card-body">
        {props.title && (
          <h5 className="card-title">
            {props.titleIcon && (
              <i className={`${props.titleIcon} me-2`}></i>
            )}
            {props.title}
          </h5>
        )}
        
        {props.subtitle && (
          <h6 className="card-subtitle mb-2 text-muted">
            {props.subtitle}
          </h6>
        )}
        
        {props.children}
      </div>
      
      {props.footer && (
        <div className="card-footer text-muted">
          {props.footer}
        </div>
      )}
    </div>
  );
}

export default Card;