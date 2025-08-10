// frontend/src/dashboard/ChangePassword.js

import React, { Component } from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { changePassword } from '../utils/api';
import { getUserInfo } from '../utils/storage';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        oldPassword: '',
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
    const { oldPassword, newPassword, confirmPassword } = this.state.formData;
    const errors = {};

    // Old password validation
    if (!oldPassword) {
      errors.oldPassword = 'Current password is required';
    }

    // New password validation
    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (newPassword === oldPassword) {
      errors.newPassword = 'New password must be different from current password';
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

  handleOldPasswordChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        oldPassword: event.target.value
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

    const userInfo = getUserInfo();
    const { oldPassword, newPassword } = this.state.formData;

    changePassword(userInfo.email, oldPassword, newPassword)
      .then((response) => {
        this.setState({ 
          loading: false,
          formData: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
        });
        this.showAlert('success', 'Password changed successfully!');
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  render() {
    return (
      <Card title="Change Password" titleIcon="fas fa-key">
        <Alert
          show={this.state.alert.show}
          type={this.state.alert.type}
          dismissible={true}
          onClose={this.hideAlert}
        >
          {this.state.alert.message}
        </Alert>

        <form onSubmit={this.handleSubmit}>
          <InputField
            label="Current Password"
            type="password"
            value={this.state.formData.oldPassword}
            onChange={this.handleOldPasswordChange}
            placeholder="Enter current password"
            required={true}
            error={this.state.errors.oldPassword}
          />

          <InputField
            label="New Password"
            type="password"
            value={this.state.formData.newPassword}
            onChange={this.handleNewPasswordChange}
            placeholder="Enter new password"
            required={true}
            error={this.state.errors.newPassword}
            help="Password should be at least 8 characters long"
          />

          <InputField
            label="Confirm New Password"
            type="password"
            value={this.state.formData.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
            placeholder="Confirm new password"
            required={true}
            error={this.state.errors.confirmPassword}
          />

          <div className="d-grid gap-2">
            <Button
              type="submit"
              variant="primary"
              loading={this.state.loading}
              disabled={this.state.loading}
              fullWidth={true}
              icon="fas fa-check"
            >
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default ChangePassword;