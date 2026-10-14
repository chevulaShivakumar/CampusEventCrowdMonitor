import React, { useState } from 'react';
import { Building2, Search, Filter } from 'lucide-react';
import VenueCard from '../components/VenueCard';

export default function VenuesPage({ venues, onQuickUpdate, onResetVenue }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (venue.location && venue.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const occupancy = venue.occupancyRate || Math.round(((venue.currentCount || 0) / venue.maxCapacity) * 100);
    const computedStatus = occupancy >= 90 ? 'CRITICAL' : occupancy >= 70 ? 'WARNING' : 'NORMAL';
    const currentStatus = venue.status || computedStatus;

    const matchesStatus = statusFilter === 'ALL' || currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '1.5rem' }}>
            <Building2 size={24} color="#60a5fa" />
            <span>Campus Venues & Capacity Monitor</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Monitor real-time occupant counts, maximum limits, and safety statuses across all buildings.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search venues..."
              className="form-input"
              style={{ paddingLeft: '2.2rem', width: '220px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['ALL', 'NORMAL', 'WARNING', 'CRITICAL'].map((status) => (
              <button
                key={status}
                className={`nav-item ${statusFilter === status ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="venues-grid">
        {filteredVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onQuickUpdate={onQuickUpdate}
            onReset={onResetVenue}
          />
        ))}
      </div>

      {filteredVenues.length === 0 && (
        <div className="empty-state">
          No venues matched your search and filter criteria.
        </div>
      )}
    </div>
  );
}
