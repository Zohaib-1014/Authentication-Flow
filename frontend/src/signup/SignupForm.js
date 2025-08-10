// frontend/src/signup/SignupForm.js

import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function SignupForm(props) {
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
        label="Username"
        type="text"
        value={props.formData.username}
        onChange={props.onUsernameChange}
        placeholder="Choose a username"
        required={true}
        error={props.errors.username}
        help="Username must be unique"
      />

      <InputField
        label="Password"
        type="password"
        value={props.formData.password}
        onChange={props.onPasswordChange}
        placeholder="Create a strong password"
        required={true}
        error={props.errors.password}
        help="Password should be at least 8 characters long"
      />

      <InputField
        label="Confirm Password"
        type="password"
        value={props.formData.confirmPassword}
        onChange={props.onConfirmPasswordChange}
        placeholder="Confirm your password"
        required={true}
        error={props.errors.confirmPassword}
      />

      <div className="d-grid gap-2">
        <Button
          type="submit"
          variant="primary"
          loading={props.loading}
          disabled={props.loading}
          fullWidth={true}
          icon="fas fa-user-plus"
        >
          Create Account
        </Button>
      </div>

      <div className="text-center mt-3">
        <p className="text-muted">
          Already have an account?{' '}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={props.onSwitchToLogin}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;