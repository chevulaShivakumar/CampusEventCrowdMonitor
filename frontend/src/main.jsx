import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './pages/LoginPage';
import './index.css';

const SESSION_KEY = 'campus-monitor-session';

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// Shows the login page first; the existing App renders unchanged once signed in.
function Root() {
  const [session, setSession] = useState(readSession);

  const handleLogin = (s) => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch { /* ignore */ }
    setSession(s);
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setSession(null);
  };

  if (!session) return <LoginPage onLogin={handleLogin} />;

  return (
    <>
      <App />
      <div className="session-bar">
        <span>Signed in as <b>{session.role.toLowerCase()}</b></span>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
