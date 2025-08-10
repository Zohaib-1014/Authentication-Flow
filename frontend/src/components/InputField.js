// frontend/src/components/InputField.js

import React from 'react';

function InputField(props) {
  return (
    <div className="mb-3">
      {props.label && (
        <label className="form-label">
          {props.label}
          {props.required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        type={props.type || 'text'}
        className={`form-control ${props.error ? 'is-invalid' : ''}`}
        value={props.value || ''}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
      />
      {props.error && (
        <div className="invalid-feedback">
          {props.error}
        </div>
      )}
      {props.help && !props.error && (
        <div className="form-text">
          {props.help}
        </div>
      )}
    </div>
  );
}

export default InputField;