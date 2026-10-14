import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function AlertBanner({ alerts, onAcknowledge }) {
  if (!alerts || alerts.length === 0) return null;

  const topAlert = alerts[0];
  const isCritical = topAlert.alertLevel === 'CRITICAL';

  return (
    <div
      className="alert-banner"
      style={!isCritical ? { backgroundColor: 'var(--warning-bg)', borderColor: 'var(--warning-border)' } : {}}
    >
      <div className="alert-content" style={!isCritical ? { color: '#fde68a' } : {}}>
        <AlertTriangle size={20} color={isCritical ? '#f87171' : '#fbbf24'} />
        <div>
          <strong>[{topAlert.alertLevel}]</strong> {topAlert.message}
          {alerts.length > 1 && (
            <span style={{ marginLeft: '0.6rem', opacity: 0.8, fontSize: '0.78rem' }}>
              (+{alerts.length - 1} other active alerts)
            </span>
          )}
        </div>
      </div>
      <button
        className="btn-secondary"
        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
        onClick={() => onAcknowledge(topAlert.id)}
      >
        <CheckCircle size={14} />
        <span>Acknowledge</span>
      </button>
    </div>
  );
}
