import React from 'react';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';

export default function EventCard({ event }) {
  const isLive = event.status === 'LIVE';

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'TBD';
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="venue-card">
      <div className="venue-header">
        <div>
          <span className="venue-code" style={{ textTransform: 'uppercase', color: '#60a5fa' }}>
            {event.category || 'Event'}
          </span>
          <h3 className="venue-title">{event.title}</h3>
          <div className="venue-loc">
            <MapPin size={13} />
            <span>{event.venueName || 'Campus Main'}</span>
          </div>
        </div>

        <span className={`status-pill ${isLive ? 'critical' : 'normal'}`} style={isLive ? { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' } : {}}>
          <span className="status-dot"></span>
          {event.status || 'UPCOMING'}
        </span>
      </div>

      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
        {event.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Clock size={13} />
          <span>{formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Users size={13} />
          <span>
            {event.currentAttendees || 0} / {event.expectedAttendees || 0} exp.
          </span>
        </div>
      </div>

      {event.organizer && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
          <Award size={12} />
          <span>Organized by: {event.organizer}</span>
        </div>
      )}
    </div>
  );
}
