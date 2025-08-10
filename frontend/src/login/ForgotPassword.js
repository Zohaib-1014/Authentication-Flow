// frontend/src/login/ForgotPassword.js

import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';

function ForgotPassword(props) {
  return (
    <div>
      <div className="text-center mb-4">
        <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
             style={{width: '60px', height: '60px'}}>
          <i className="fas fa-key fa-2x"></i>
        </div>
        <h4 className="mt-3">Forgot Password?</h4>
        <p className="text-muted">
          Enter your email address and we'll send you a reset code.
        </p>
      </div>

      <Alert type="info" show={true}>
        Enter the email address associated with your account.
      </Alert>

      <form onSubmit={props.onSubmit}>
        <InputField
          label="Email Address"
          type="email"
          value={props.email}
          onChange={props.onEmailChange}
          placeholder="Enter your email address"
          required={true}
          error={props.error}
        />

        <div className="d-grid gap-2">
          <Button
            type="submit"
            variant="warning"
            loading={props.loading}
            disabled={props.loading}
            fullWidth={true}
            icon="fas fa-paper-plane"
          >
            Send Reset Code
          </Button>
        </div>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={props.onBack}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;