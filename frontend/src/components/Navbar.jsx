import React from 'react';
import { ShieldAlert, Users, Building2, Calendar, Activity, Sliders, RefreshCw } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount, onOpenSimulator, onRefresh, loading }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon-wrapper">
          <Users size={22} />
        </div>
        <div>
          <span className="brand-title">Campus Crowd Monitor</span>
          <span className="brand-sub">Real-Time Event & Safety Analytics</span>
        </div>
      </div>

      <div className="nav-links">
        <button
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity size={16} />
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'venues' ? 'active' : ''}`}
          onClick={() => setActiveTab('venues')}
        >
          <Building2 size={16} />
          <span>Venues</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          <span>Events</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <Users size={16} />
          <span>Crowd Flow</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <ShieldAlert size={16} />
          <span>Alerts</span>
          {alertCount > 0 && <span className="nav-badge">{alertCount}</span>}
        </button>
      </div>

      <div className="nav-actions">
        <button className="btn-secondary" onClick={onRefresh} title="Refresh data">
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          <span>Refresh</span>
        </button>
        <button className="btn-primary" onClick={onOpenSimulator}>
          <Sliders size={16} />
          <span>Simulate Flow</span>
        </button>
      </div>
    </nav>
  );
}
