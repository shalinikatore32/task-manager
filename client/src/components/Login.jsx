import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Login.css';
import Loader from './Loader';
import { Consumer } from '../store-token/UseAuth';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // Toggle between login and signup
  const [loading, setLoading] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const { storeToken } = Consumer();

  const [signupFormData, setSignupFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5008/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
      });

      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData);
        storeToken(responseData.token);
        toast.success('Logged in successfully');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation for password matching
    if (signupFormData.password !== signupFormData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5008/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupFormData),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success('Registered successfully');
        setActiveTab('login'); // Switch to login after successful signup
      } else {
        toast.error('Signup failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-signup-container">
      {loading && <Loader />}
      <div className="form-wrapper">
        {/* Main Heading */}
        <h1 className="main-heading">Welcome to Task Manager</h1>

        {/* Tabs to switch between login and signup */}
        <div className="tabs">
          <button
            className={activeTab === 'login' ? 'tab active' : 'tab'}
            onClick={() => handleTabSwitch('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'tab active' : 'tab'}
            onClick={() => handleTabSwitch('signup')}
          >
            Signup
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="login-signup-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Login</button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="login-signup-form signup-grid">
            <h2>Signup</h2>
            <div className="form-group">
              <label htmlFor="signup-fname">First Name</label>
              <input
                type="text"
                id="signup-fname"
                name="fname"
                value={signupFormData.fname}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-lname">Last Name</label>
              <input
                type="text"
                id="signup-lname"
                name="lname"
                value={signupFormData.lname}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                type="text"
                id="signup-username"
                name="username"
                value={signupFormData.username}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                value={signupFormData.email}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                value={signupFormData.password}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm-password">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={signupFormData.confirmPassword}
                onChange={handleSignupChange}
                required
              />
            </div>
            <div className="button-wrapper">
              <button type="submit" className="submit-button">Signup</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
