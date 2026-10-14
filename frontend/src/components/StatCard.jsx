import React from 'react';

export default function StatCard({ label, value, sub, icon: Icon, color = 'blue' }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
      {Icon && (
        <div className={`stat-icon ${color}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
