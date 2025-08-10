// frontend/src/signup/EmailVerification.js

import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';

function EmailVerification(props) {
  return (
    <div>
      <div className="text-center mb-4">
        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
             style={{width: '60px', height: '60px'}}>
          <i className="fas fa-envelope-open fa-2x"></i>
        </div>
        <h4 className="mt-3">Verify Your Email</h4>
        <p className="text-muted">
          We've sent a verification code to<br />
          <strong>{props.email}</strong>
        </p>
      </div>

      <Alert type="info" show={true}>
        Enter the 6-digit code sent to your email address.
      </Alert>

      <form onSubmit={props.onSubmit}>
        <InputField
          label="Verification Code"
          type="text"
          value={props.code}
          onChange={props.onCodeChange}
          placeholder="Enter 6-digit code"
          required={true}
          error={props.error}
          help="Check your email inbox and spam folder"
        />

        <div className="d-grid gap-2">
          <Button
            type="submit"
            variant="success"
            loading={props.loading}
            disabled={props.loading}
            fullWidth={true}
            icon="fas fa-check"
          >
            Verify Email
          </Button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-muted">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={props.onResendCode}
            disabled={props.resendLoading}
          >
            {props.resendLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </p>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={props.onBack}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Sign Up
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;