import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AlertsPage({ alerts, onAcknowledge }) {
  const [filterType, setFilterType] = useState('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'ACTIVE') return !alert.acknowledged;
    if (filterType === 'ACKNOWLEDGED') return alert.acknowledged;
    if (filterType === 'CRITICAL') return alert.alertLevel === 'CRITICAL';
    return true;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
            <ShieldAlert size={24} color="#ef4444" />
            <span>Safety Alerts & Overcrowding Incidents</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Automated alerts dispatched when venue thresholds (85% caution, 95% critical) are exceeded.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          {['ALL', 'ACTIVE', 'CRITICAL', 'ACKNOWLEDGED'].map((f) => (
            <button
              key={f}
              className={`nav-item ${filterType === f ? 'active' : ''}`}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              onClick={() => setFilterType(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {filteredAlerts.map((alert) => {
          const isCrit = alert.alertLevel === 'CRITICAL';
          return (
            <div
              key={alert.id}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                opacity: alert.acknowledged ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    backgroundColor: isCrit ? 'var(--danger-bg)' : 'var(--warning-bg)',
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    color: isCrit ? '#f87171' : '#fbbf24',
                  }}
                >
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <span className={`status-pill ${isCrit ? 'critical' : 'warning'}`}>
                      {alert.alertLevel}
                    </span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {alert.venueName}
                    </strong>
                    {alert.occupancyPercentage && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ({alert.occupancyPercentage}% capacity)
                      </span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {alert.message}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.4rem' }}>
                    <Clock size={12} />
                    <span>{alert.timestamp ? new Date(alert.timestamp).toLocaleString() : 'Recent'}</span>
                  </div>
                </div>
              </div>

              <div>
                {!alert.acknowledged ? (
                  <button
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                    onClick={() => onAcknowledge(alert.id)}
                  >
                    <CheckCircle size={14} />
                    <span>Acknowledge</span>
                  </button>
                ) : (
                  <span style={{ color: '#34d399', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <CheckCircle size={14} /> Acknowledged
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="empty-state">
            No alerts found matching this filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
