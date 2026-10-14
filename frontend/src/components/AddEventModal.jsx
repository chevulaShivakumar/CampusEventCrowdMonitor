import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

export default function AddEventModal({ isOpen, onClose, venues, onAddEvent }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venueId, setVenueId] = useState(venues[0]?.id || 1);
  const [category, setCategory] = useState('Tech');
  const [expectedAttendees, setExpectedAttendees] = useState(300);
  const [organizer, setOrganizer] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVenue = venues.find((v) => v.id === Number(venueId));
    onAddEvent({
      title,
      description,
      venueId: Number(venueId),
      venueName: selectedVenue ? selectedVenue.name : '',
      category,
      expectedAttendees: Number(expectedAttendees),
      status: 'UPCOMING',
      organizer: organizer || 'Campus Committee',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">Schedule Campus Event</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AI Hackathon 2026 Finals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows="2"
                placeholder="Event overview, agenda and requirements"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Venue</label>
              <select
                className="form-select"
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
              >
                {venues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (Max: {v.maxCapacity})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Tech">Tech</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Expected Attendees</label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  className="form-input"
                  value={expectedAttendees}
                  onChange={(e) => setExpectedAttendees(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Organizer Department / Club</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Robotics Club, Dean Student Affairs"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Calendar size={15} />
              <span>Create Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
