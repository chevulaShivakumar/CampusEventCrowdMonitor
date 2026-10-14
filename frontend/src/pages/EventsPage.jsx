import React, { useState } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import EventCard from '../components/EventCard';

export default function EventsPage({ events, onOpenAddEvent }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ev.category && ev.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ev.venueName && ev.venueName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'ALL' || ev.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
            <Calendar size={24} color="#fbbf24" />
            <span>Campus Event Directory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Coordinate schedules, monitor live attendance, and maintain event safety compliance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search events..."
              className="form-input"
              style={{ paddingLeft: '2.2rem', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['ALL', 'LIVE', 'UPCOMING', 'CONCLUDED'].map((status) => (
              <button
                key={status}
                className={`nav-item ${filterStatus === status ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={onOpenAddEvent}>
            <Plus size={16} />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      <div className="venues-grid">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="empty-state">
          No events found matching your filter.
        </div>
      )}
    </div>
  );
}
