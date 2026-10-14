import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function CrowdSimulatorModal({ isOpen, onClose, venues, onSimulate }) {
  const [venueId, setVenueId] = useState(venues[0]?.id || 1);
  const [changeAmount, setChangeAmount] = useState(25);
  const [direction, setDirection] = useState('INFLOW'); // INFLOW or OUTFLOW
  const [gateName, setGateName] = useState('Gate 1 - North Wing Turnstiles');
  const [notes, setNotes] = useState('Simulated crowd influx from session break');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = direction === 'OUTFLOW' ? -Math.abs(Number(changeAmount)) : Math.abs(Number(changeAmount));
    onSimulate({
      venueId: Number(venueId),
      changeAmount: finalAmount,
      flowType: direction,
      gateName,
      notes
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">Simulate Crowd Traffic</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Target Venue</label>
              <select
                className="form-select"
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.currentCount}/{v.maxCapacity} - {v.occupancyRate || Math.round((v.currentCount/v.maxCapacity)*100)}%)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Flow Direction</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className={`btn-secondary ${direction === 'INFLOW' ? 'btn-primary' : ''}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setDirection('INFLOW')}
                >
                  Incoming (+ Attendees)
                </button>
                <button
                  type="button"
                  className={`btn-secondary ${direction === 'OUTFLOW' ? 'btn-primary' : ''}`}
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setDirection('OUTFLOW')}
                >
                  Outgoing (- Attendees)
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Number of People</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {[10, 25, 50, 100].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn-secondary ${Number(changeAmount) === num ? 'btn-primary' : ''}`}
                    style={{ flex: 1, padding: '0.4rem', justifyContent: 'center' }}
                    onClick={() => setChangeAmount(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="1"
                max="500"
                className="form-input"
                value={changeAmount}
                onChange={(e) => setChangeAmount(e.target.value)}
                placeholder="Custom attendee count"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gate / Entry Point</label>
              <select
                className="form-select"
                value={gateName}
                onChange={(e) => setGateName(e.target.value)}
              >
                <option value="Gate 1 - North Wing Turnstiles">Gate 1 - North Wing Turnstiles</option>
                <option value="Gate 2 - Main Lobby Glass Doors">Gate 2 - Main Lobby Glass Doors</option>
                <option value="Gate 3 - South Bleachers Entry">Gate 3 - South Bleachers Entry</option>
                <option value="Express Sensor - VIP/Staff Arch">Express Sensor - VIP/Staff Arch</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Notes / Simulation Reason</label>
              <input
                type="text"
                className="form-input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Session ended, lunch rush, sudden crowd surge"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={15} />
              <span>Apply Traffic Delta</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
