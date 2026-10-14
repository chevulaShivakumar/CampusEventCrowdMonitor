import React from 'react';
import { Users, Building2, AlertTriangle, Calendar, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import VenueCard from '../components/VenueCard';
import EventCard from '../components/EventCard';
import AlertBanner from '../components/AlertBanner';

export default function Dashboard({
  summary,
  venues,
  events,
  logs,
  alerts,
  onQuickUpdate,
  onResetVenue,
  onAcknowledgeAlert,
  onNavigateToTab
}) {
  const liveEvents = events.filter((e) => e.status === 'LIVE');

  return (
    <div>
      {/* Active Alerts Banner */}
      <AlertBanner alerts={alerts} onAcknowledge={onAcknowledgeAlert} />

      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <StatCard
          label="Total Campus Crowd"
          value={summary.currentOccupancy?.toLocaleString() || '0'}
          sub={`${summary.overallOccupancyPercent || 0}% overall capacity`}
          icon={Users}
          color="blue"
        />
        <StatCard
          label="Total Capacity"
          value={summary.totalCapacity?.toLocaleString() || '0'}
          sub={`Across ${summary.totalVenues || 0} campus locations`}
          icon={Building2}
          color="green"
        />
        <StatCard
          label="Active Overcrowd Alerts"
          value={summary.criticalVenuesCount || alerts.length || '0'}
          sub={`${summary.warningVenuesCount || 0} venues near threshold`}
          icon={AlertTriangle}
          color={alerts.length > 0 ? 'red' : 'green'}
        />
        <StatCard
          label="Active Live Events"
          value={summary.activeEventsCount || liveEvents.length || '0'}
          sub="Ongoing sessions & sports"
          icon={Calendar}
          color="amber"
        />
      </div>

      {/* Main Venues Section */}
      <div className="section-header">
        <h2 className="section-title">
          <Building2 size={20} color="#60a5fa" />
          <span>Live Venue Occupancy & Safety Levels</span>
        </h2>
        <button className="btn-secondary" onClick={() => onNavigateToTab('venues')}>
          View All Venues →
        </button>
      </div>

      <div className="venues-grid">
        {venues.slice(0, 6).map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onQuickUpdate={onQuickUpdate}
            onReset={onResetVenue}
          />
        ))}
      </div>

      {/* Bottom split: Live Events & Recent Flow Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {/* Live Events Column */}
        <div>
          <div className="section-header">
            <h2 className="section-title">
              <Calendar size={18} color="#fbbf24" />
              <span>Happening Now on Campus</span>
            </h2>
            <button className="btn-secondary" onClick={() => onNavigateToTab('events')}>
              All Events
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {liveEvents.length > 0 ? (
              liveEvents.slice(0, 3).map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="empty-state">No live events at the moment.</div>
            )}
          </div>
        </div>

        {/* Recent Crowd Logs Column */}
        <div>
          <div className="section-header">
            <h2 className="section-title">
              <Activity size={18} color="#34d399" />
              <span>Real-Time Gate Activity</span>
            </h2>
            <button className="btn-secondary" onClick={() => onNavigateToTab('logs')}>
              Full Logs
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Gate / Point</th>
                  <th>Flow</th>
                  <th>Venue</th>
                  <th>Delta</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 6).map((log) => {
                  const isInflow = log.changeAmount > 0;
                  return (
                    <tr key={log.id}>
                      <td style={{ fontWeight: 600 }}>{log.gateName || 'Main Entry'}</td>
                      <td>
                        <span
                          className={`status-pill ${isInflow ? 'normal' : 'warning'}`}
                          style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}
                        >
                          {isInflow ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {log.flowType || (isInflow ? 'IN' : 'OUT')}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{log.venueName}</td>
                      <td style={{ fontWeight: 700, color: isInflow ? '#34d399' : '#fb923c' }}>
                        {isInflow ? `+${log.changeAmount}` : log.changeAmount}
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
