import React from 'react';
import { MapPin, Calendar, Plus, Minus, RotateCcw } from 'lucide-react';

export default function VenueCard({ venue, onQuickUpdate, onReset }) {
  const occupancy = venue.occupancyRate || Math.round(((venue.currentCount || 0) / venue.maxCapacity) * 1000) / 10;
  
  let fillClass = 'fill-normal';
  let statusClass = 'normal';
  if (occupancy >= 90) {
    fillClass = 'fill-critical';
    statusClass = 'critical';
  } else if (occupancy >= 70) {
    fillClass = 'fill-warning';
    statusClass = 'warning';
  }

  return (
    <div className="venue-card">
      <div className="venue-header">
        <div>
          <span className="venue-code">{venue.code}</span>
          <h3 className="venue-title">{venue.name}</h3>
          <div className="venue-loc">
            <MapPin size={13} />
            <span>{venue.location}</span>
          </div>
        </div>
        <span className={`status-pill ${statusClass}`}>
          <span className="status-dot"></span>
          {venue.status || (occupancy >= 90 ? 'CRITICAL' : occupancy >= 70 ? 'WARNING' : 'NORMAL')}
        </span>
      </div>

      <div className="meter-wrapper">
        <div className="meter-labels">
          <span className="meter-percentage">{occupancy}%</span>
          <span className="meter-numbers">
            {venue.currentCount?.toLocaleString()} / {venue.maxCapacity?.toLocaleString()} attendees
          </span>
        </div>
        <div className="progress-bar-bg">
          <div
            className={`progress-bar-fill ${fillClass}`}
            style={{ width: `${Math.min(occupancy, 100)}%` }}
          />
        </div>
      </div>

      {venue.activeEventTitle && (
        <div style={{ fontSize: '0.8rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={13} />
          <span>Active: <strong>{venue.activeEventTitle}</strong></span>
        </div>
      )}

      <div className="venue-controls">
        <button
          className="btn-ctrl btn-add"
          onClick={() => onQuickUpdate(venue.id, 10)}
          title="Add 10 attendees"
        >
          <Plus size={13} /> +10
        </button>
        <button
          className="btn-ctrl btn-add"
          onClick={() => onQuickUpdate(venue.id, 25)}
          title="Add 25 attendees"
        >
          <Plus size={13} /> +25
        </button>
        <button
          className="btn-ctrl btn-sub"
          onClick={() => onQuickUpdate(venue.id, -10)}
          title="Subtract 10 attendees"
        >
          <Minus size={13} /> -10
        </button>
        <button
          className="btn-ctrl"
          onClick={() => onReset(venue.id)}
          title="Reset venue count"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}
