// frontend/src/login/Login.js

import React, { Component } from 'react';
import Card from '../components/Card';
import Alert from '../components/Alert';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import { loginUser, forgetPassword } from '../utils/api';
import { saveUserTokens, saveUserInfo } from '../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'login', // 'login' or 'forgot'
      formData: {
        email: '',
        password: ''
      },
      forgotEmail: '',
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

  validateLoginForm = () => {
    const { email, password } = this.state.formData;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
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

  handlePasswordChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        password: event.target.value
      }
    });
  }

  handleForgotEmailChange = (event) => {
    this.setState({ forgotEmail: event.target.value });
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    this.hideAlert();

    if (!this.validateLoginForm()) {
      return;
    }

    this.setState({ loading: true });

    const { email, password } = this.state.formData;

    loginUser(email, password)
      .then((response) => {
        this.setState({ loading: false });
        
        // Save tokens and user info
        saveUserTokens(response.access_token, response.refresh_token);
        
        // Decode token to get user role (simple approach)
        // In a real app, you might want to call the profile endpoint
        // For now, we'll call the profile endpoint to get user data
        this.getUserProfile(email, response.access_token);
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  getUserProfile = (email, accessToken) => {
    // Import here to avoid circular dependency
    const { getUserProfile } = require('../utils/api');
    
    getUserProfile(email)
      .then((userProfile) => {
        // Save user info
        saveUserInfo(userProfile.email, userProfile.role);
        
        // Navigate to dashboard
        this.showAlert('success', 'Login successful! Redirecting...');
        setTimeout(() => {
          this.props.onLoginSuccess();
        }, 1500);
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
        // Still navigate to dashboard, but without role info
        saveUserInfo(email, 'user'); // Default to user role
        this.props.onLoginSuccess();
      });
  }

  handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    this.hideAlert();

    if (!this.state.forgotEmail) {
      this.showAlert('danger', 'Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(this.state.forgotEmail)) {
      this.showAlert('danger', 'Please enter a valid email');
      return;
    }

    this.setState({ loading: true });

    forgetPassword(this.state.forgotEmail)
      .then((response) => {
        this.setState({ loading: false });
        this.showAlert('success', response.message);
        setTimeout(() => {
          this.props.onPageChange('reset_password');
        }, 2000);
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  handleSwitchToForgot = () => {
    this.setState({ currentView: 'forgot' });
    this.hideAlert();
  }

  handleBackToLogin = () => {
    this.setState({ currentView: 'login', forgotEmail: '' });
    this.hideAlert();
  }

  render() {
    const { currentView } = this.state;

    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100 bg-light">
          <div className="col-md-6 col-lg-4">
            <Card 
              title={currentView === 'login' ? 'Welcome Back' : 'Reset Password'}
              titleIcon={currentView === 'login' ? 'fas fa-sign-in-alt' : 'fas fa-key'}
              className="shadow"
            >
              <Alert
                show={this.state.alert.show}
                type={this.state.alert.type}
                dismissible={true}
                onClose={this.hideAlert}
              >
                {this.state.alert.message}
              </Alert>

              {currentView === 'login' ? (
                <LoginForm
                  formData={this.state.formData}
                  errors={this.state.errors}
                  loading={this.state.loading}
                  onSubmit={this.handleLoginSubmit}
                  onEmailChange={this.handleEmailChange}
                  onPasswordChange={this.handlePasswordChange}
                  onForgotPassword={this.handleSwitchToForgot}
                  onSwitchToSignup={() => this.props.onPageChange('signup')}
                />
              ) : (
                <ForgotPassword
                  email={this.state.forgotEmail}
                  loading={this.state.loading}
                  onSubmit={this.handleForgotPasswordSubmit}
                  onEmailChange={this.handleForgotEmailChange}
                  onBack={this.handleBackToLogin}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;