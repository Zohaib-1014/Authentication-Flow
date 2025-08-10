// frontend/src/login/LoginForm.js

import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function LoginForm(props) {
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
        label="Password"
        type="password"
        value={props.formData.password}
        onChange={props.onPasswordChange}
        placeholder="Enter your password"
        required={true}
        error={props.errors.password}
      />

      <div className="d-grid gap-2">
        <Button
          type="submit"
          variant="primary"
          loading={props.loading}
          disabled={props.loading}
          fullWidth={true}
          icon="fas fa-sign-in-alt"
        >
          Sign In
        </Button>
      </div>

      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none"
          onClick={props.onForgotPassword}
        >
          <i className="fas fa-key me-1"></i>
          Forgot Password?
        </button>
      </div>

      <hr className="my-4" />

      <div className="text-center">
        <p className="text-muted">
          Don't have an account?{' '}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={props.onSwitchToSignup}
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;