// frontend/src/signup/Signup.js

import React, { Component } from 'react';
import Card from '../components/Card';
import Alert from '../components/Alert';
import SignupForm from './SignupForm';
import EmailVerification from './EmailVerification';
import { registerUser, confirmEmail } from '../utils/api';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 'signup', // 'signup' or 'verification'
      formData: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      verificationCode: '',
      errors: {},
      loading: false,
      resendLoading: false,
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
    const { email, username, password, confirmPassword } = this.state.formData;
    const errors = {};

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    // Username validation
    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
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

  handleUsernameChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        username: event.target.value
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

  handleConfirmPasswordChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        confirmPassword: event.target.value
      }
    });
  }

  handleCodeChange = (event) => {
    this.setState({ verificationCode: event.target.value });
  }

  handleSignupSubmit = (event) => {
    event.preventDefault();
    this.hideAlert();

    if (!this.validateForm()) {
      return;
    }

    this.setState({ loading: true });

    const { email, username, password } = this.state.formData;

    registerUser(email, username, password)
      .then((response) => {
        this.setState({ 
          loading: false, 
          currentStep: 'verification' 
        });
        this.showAlert('success', response.message);
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  handleVerificationSubmit = (event) => {
    event.preventDefault();
    this.hideAlert();

    if (!this.state.verificationCode) {
      this.showAlert('danger', 'Please enter verification code');
      return;
    }

    this.setState({ loading: true });

    confirmEmail(this.state.formData.email, this.state.verificationCode)
      .then((response) => {
        this.setState({ loading: false });
        this.showAlert('success', 'Email verified successfully! You can now login.');
        setTimeout(() => {
          this.props.onPageChange('login');
        }, 2000);
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showAlert('danger', error.message);
      });
  }

  handleResendCode = () => {
    this.setState({ resendLoading: true });
    
    const { email, username, password } = this.state.formData;
    
    registerUser(email, username, password)
      .then((response) => {
        this.setState({ resendLoading: false });
        this.showAlert('success', 'Verification code sent again!');
      })
      .catch((error) => {
        this.setState({ resendLoading: false });
        this.showAlert('danger', error.message);
      });
  }

  handleBackToSignup = () => {
    this.setState({ 
      currentStep: 'signup',
      verificationCode: '',
      errors: {}
    });
    this.hideAlert();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100 bg-light">
          <div className="col-md-6 col-lg-4">
            <Card 
              title={this.state.currentStep === 'signup' ? 'Create Account' : 'Verify Email'}
              titleIcon={this.state.currentStep === 'signup' ? 'fas fa-user-plus' : 'fas fa-envelope-open'}
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

              {this.state.currentStep === 'signup' ? (
                <SignupForm
                  formData={this.state.formData}
                  errors={this.state.errors}
                  loading={this.state.loading}
                  onSubmit={this.handleSignupSubmit}
                  onEmailChange={this.handleEmailChange}
                  onUsernameChange={this.handleUsernameChange}
                  onPasswordChange={this.handlePasswordChange}
                  onConfirmPasswordChange={this.handleConfirmPasswordChange}
                  onSwitchToLogin={() => this.props.onPageChange('login')}
                />
              ) : (
                <EmailVerification
                  email={this.state.formData.email}
                  code={this.state.verificationCode}
                  loading={this.state.loading}
                  resendLoading={this.state.resendLoading}
                  onSubmit={this.handleVerificationSubmit}
                  onCodeChange={this.handleCodeChange}
                  onResendCode={this.handleResendCode}
                  onBack={this.handleBackToSignup}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;