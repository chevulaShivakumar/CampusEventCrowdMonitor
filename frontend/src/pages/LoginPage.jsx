import React, { useState } from 'react';
import { Users, User, ShieldCheck, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import './LoginPage.css';

// Demo credentials only. The backend has no auth yet, so these are checked in the browser.
// Replace `authenticate` with a real API call (e.g. POST /api/auth/login) when auth is added.
const DEMO_ACCOUNTS = {
  USER: { email: 'user@campus.edu', password: 'user123' },
  ADMIN: { email: 'admin@campus.edu', password: 'admin123' }
};

function authenticate(role, email, password) {
  const acct = DEMO_ACCOUNTS[role];
  return email.trim().toLowerCase() === acct.email && password === acct.password;
}

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const switchRole = (next) => {
    setRole(next);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setSubmitting(true);
    setError('');
    setTimeout(() => {
      if (authenticate(role, email, password)) {
        onLogin({ role, email: email.trim().toLowerCase() });
      } else {
        setError(`Invalid ${role === 'ADMIN' ? 'admin' : 'user'} credentials. Please try again.`);
        setSubmitting(false);
      }
    }, 400);
  };

  const fillDemo = () => {
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-icon-wrapper"><Users size={22} /></div>
          <div>
            <span className="brand-title">Campus Crowd Monitor</span>
            <span className="brand-sub">Real-Time Event & Safety Analytics</span>
          </div>
        </div>

        <h1 className="login-heading">Welcome back</h1>
        <p className="login-subheading">Sign in to continue to your dashboard.</p>

        <div className="login-roles" role="tablist" aria-label="Sign in as">
          <button
            type="button"
            role="tab"
            aria-selected={role === 'USER'}
            className={`login-role ${role === 'USER' ? 'active' : ''}`}
            onClick={() => switchRole('USER')}
          >
            <User size={16} /> User
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={role === 'ADMIN'}
            className={`login-role ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => switchRole('ADMIN')}
          >
            <ShieldCheck size={16} /> Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label className="login-field">
            <span>Email</span>
            <div className="login-input">
              <Mail size={16} />
              <input
                type="email"
                autoComplete="username"
                placeholder={DEMO_ACCOUNTS[role].email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="login-field">
            <span>Password</span>
            <div className="login-input">
              <Lock size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="login-error" role="alert">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button type="submit" className="btn-primary login-submit" disabled={submitting}>
            <LogIn size={16} />
            <span>{submitting ? 'Signing in…' : `Sign in as ${role === 'ADMIN' ? 'Admin' : 'User'}`}</span>
          </button>
        </form>

        <button type="button" className="login-demo" onClick={fillDemo}>
          Use demo {role === 'ADMIN' ? 'admin' : 'user'} credentials
        </button>
      </div>
    </div>
  );
}
