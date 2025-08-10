// frontend/src/reset-password/ResetPassword.js

import React, { Component } from 'react';
import Card from '../components/Card';
import Alert from '../components/Alert';
import ResetForm from './ResetForm';
import { resetPassword } from '../utils/api';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
      },
      errors: {},
      loading: false,
      alert: {
        show: false,
        type: '',
        message: ''
      }
    };
  }

  showAlert = (type, message) => {
    this.setState({
      alert: {
        show: true,
        type: type,
        message: message
      }
    });
  }

  hideAlert = () => {
    this.setState({
      alert: {
        show: false,
        type: '',
        message: ''
      }
    });
  }

  validateForm = () => {
    const { email, code, newPassword, confirmPassword } = this.state.formData;
    const errors = {};

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // Code validation
    if (!code) {
      errors.code = 'Reset code is required';
    } else if (code.length !== 6) {
      errors.code = 'Reset code must be 6 digits';
    }

    // Password validation
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleEmailChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        email: event.target.value
      }
    });
  }

  handleCodeChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        code: event.target.value
      }
    });
  }

  handleNewPasswordChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        newPassword: event.target.value
      }
    });
  }

  handleConfirmPasswordChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        confirmPassword: event.target.value
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.hideAlert();

    if (!this.validateForm()) {
      return;
    }

    this.setState({ loading: true });

    const { email, code, newPassword } = this.state.formData;

    resetPassword(email, code, newPassword)
      .then((response) => {
        this.setState({ loading: false });
        this.showAlert('success', 'Password reset successfully! You can now login with your new password.');
        setTimeout(() => {
          this.props.onPageChange('login');
        }, 3000);
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100 bg-light">
          <div className="col-md-6 col-lg-4">
            <Card 
              title="Reset Password"
              titleIcon="fas fa-key"
              className="shadow"
            >
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '60px', height: '60px'}}>
                  <i className="fas fa-lock fa-2x"></i>
                </div>
                <h5 className="mt-3">Create New Password</h5>
                <p className="text-muted">
                  Enter the code sent to your email and create a new password.
                </p>
              </div>

              <Alert
                show={this.state.alert.show}
                type={this.state.alert.type}
                dismissible={true}
                onClose={this.hideAlert}
              >
                {this.state.alert.message}
              </Alert>

              <ResetForm
                formData={this.state.formData}
                errors={this.state.errors}
                loading={this.state.loading}
                onSubmit={this.handleSubmit}
                onEmailChange={this.handleEmailChange}
                onCodeChange={this.handleCodeChange}
                onNewPasswordChange={this.handleNewPasswordChange}
                onConfirmPasswordChange={this.handleConfirmPasswordChange}
                onBackToLogin={() => this.props.onPageChange('login')}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;