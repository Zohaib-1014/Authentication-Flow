// frontend/src/components/Loading.js

import React from 'react';

function Loading(props) {
  if (!props.show) {
    return null;
  }

  if (props.fullPage) {
    return (
      <div className="d-flex justify-content-center align-items-center" 
           style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          {props.message && (
            <div className="mt-3">
              <p className="text-muted">{props.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className="text-center">
        <div className={`spinner-border ${props.size ? `spinner-border-${props.size}` : ''} text-primary`} 
             role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {props.message && (
          <div className="mt-2">
            <small className="text-muted">{props.message}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loading;