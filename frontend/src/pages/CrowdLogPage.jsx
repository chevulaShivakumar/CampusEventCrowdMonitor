import React, { useState } from 'react';
import { Users, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';

export default function CrowdLogPage({ logs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [flowFilter, setFlowFilter] = useState('ALL');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      (log.venueName && log.venueName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.gateName && log.gateName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.notes && log.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    const isInflow = log.changeAmount > 0;
    const flowType = log.flowType || (isInflow ? 'INFLOW' : 'OUTFLOW');
    const matchesFlow = flowFilter === 'ALL' || flowType.toUpperCase() === flowFilter;

    return matchesSearch && matchesFlow;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
            <Users size={24} color="#34d399" />
            <span>Turnstile & Gate Influx Logs</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Audit trail of attendee entries, departures, gate counters, and manual crowd corrections.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search logs..."
              className="form-input"
              style={{ paddingLeft: '2.2rem', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['ALL', 'INFLOW', 'OUTFLOW'].map((flow) => (
              <button
                key={flow}
                className={`nav-item ${flowFilter === flow ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                onClick={() => setFlowFilter(flow)}
              >
                {flow}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Gate / Entrance</th>
              <th>Flow Type</th>
              <th>Target Venue</th>
              <th>Change Count</th>
              <th>Resulting Occupancy</th>
              <th>Context / Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => {
              const isInflow = log.changeAmount > 0;
              return (
                <tr key={log.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Just now'}
                  </td>
                  <td style={{ fontWeight: 600 }}>{log.gateName || 'Main Entry Sensor'}</td>
                  <td>
                    <span
                      className={`status-pill ${isInflow ? 'normal' : 'warning'}`}
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem' }}
                    >
                      {isInflow ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {log.flowType || (isInflow ? 'INFLOW' : 'OUTFLOW')}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{log.venueName}</td>
                  <td style={{ fontWeight: 800, color: isInflow ? '#34d399' : '#fb923c' }}>
                    {isInflow ? `+${log.changeAmount}` : log.changeAmount}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {log.resultingCount != null ? `${log.resultingCount.toLocaleString()} attendees` : '—'}
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                    {log.notes || 'Routine crowd sensor reading'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredLogs.length === 0 && (
        <div className="empty-state">
          No crowd activity logs recorded matching this filter.
        </div>
      )}
    </div>
  );
}
