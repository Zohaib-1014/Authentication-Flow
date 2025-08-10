// frontend/src/reset-password/ResetForm.js

import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function ResetForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <InputField
        label="Email Address"
        type="email"
        value={props.formData.email}
        onChange={props.onEmailChange}
        placeholder="Enter your email"
        required={true}
        error={props.errors.email}
      />

      <InputField
        label="Reset Code"
        type="text"
        value={props.formData.code}
        onChange={props.onCodeChange}
        placeholder="Enter 6-digit code"
        required={true}
        error={props.errors.code}
        help="Enter the code sent to your email"
      />

      <InputField
        label="New Password"
        type="password"
        value={props.formData.newPassword}
        onChange={props.onNewPasswordChange}
        placeholder="Enter new password"
        required={true}
        error={props.errors.newPassword}
        help="Password should be at least 8 characters long"
      />

      <InputField
        label="Confirm New Password"
        type="password"
        value={props.formData.confirmPassword}
        onChange={props.onConfirmPasswordChange}
        placeholder="Confirm new password"
        required={true}
        error={props.errors.confirmPassword}
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
          Reset Password
        </Button>
      </div>

      <div className="text-center mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={props.onBackToLogin}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Login
        </button>
      </div>
    </form>
  );
}

export default ResetForm;