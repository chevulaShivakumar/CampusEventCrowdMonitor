const API_BASE_URL = '/api';

// Fallback mock data in case backend is offline
const MOCK_SUMMARY = {
  totalVenues: 5,
  totalCapacity: 4350,
  currentOccupancy: 2560,
  overallOccupancyPercent: 58.9,
  criticalVenuesCount: 1,
  warningVenuesCount: 1,
  normalVenuesCount: 3,
  activeEventsCount: 3,
  unacknowledgedAlertsCount: 2
};

const MOCK_VENUES = [
  {
    id: 1,
    code: 'AUD-01',
    name: 'Grand University Auditorium',
    location: 'Central Campus - Block A',
    maxCapacity: 1200,
    currentCount: 1080,
    safetyThresholdPercent: 85,
    status: 'CRITICAL',
    activeEventTitle: 'Annual Tech Innovation Summit 2026',
    occupancyRate: 90.0
  },
  {
    id: 2,
    code: 'STAD-02',
    name: 'Indoor Sports Arena',
    location: 'North Campus - Sports Complex',
    maxCapacity: 800,
    currentCount: 580,
    safetyThresholdPercent: 80,
    status: 'WARNING',
    activeEventTitle: 'Inter-College Basketball Championship',
    occupancyRate: 72.5
  },
  {
    id: 3,
    code: 'STUC-03',
    name: 'Student Center & Food Court',
    location: 'Central Plaza - Ground Floor',
    maxCapacity: 600,
    currentCount: 310,
    safetyThresholdPercent: 85,
    status: 'NORMAL',
    activeEventTitle: 'Clubs & Societies Fair',
    occupancyRate: 51.7
  },
  {
    id: 4,
    code: 'AMPH-04',
    name: 'Open Air Amphitheatre',
    location: 'South Lawn - Cultural Zone',
    maxCapacity: 1500,
    currentCount: 450,
    safetyThresholdPercent: 85,
    status: 'NORMAL',
    activeEventTitle: 'Campus Acoustic Night & Jam',
    occupancyRate: 30.0
  },
  {
    id: 5,
    code: 'SEM-05',
    name: 'Turing Seminar Hall',
    location: 'Engineering Block C - 3rd Floor',
    maxCapacity: 250,
    currentCount: 140,
    safetyThresholdPercent: 85,
    status: 'NORMAL',
    activeEventTitle: 'AI & Robotics Guest Lecture',
    occupancyRate: 56.0
  }
];

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Annual Tech Innovation Summit 2026',
    description: 'Keynote sessions, hackathon demos, and venture pitches from top student startups.',
    venueId: 1,
    venueName: 'Grand University Auditorium',
    category: 'Tech',
    startTime: '2026-10-13T10:00:00',
    endTime: '2026-10-13T18:00:00',
    expectedAttendees: 1100,
    currentAttendees: 1080,
    status: 'LIVE',
    organizer: 'Department of Computer Science'
  },
  {
    id: 2,
    title: 'Inter-College Basketball Championship',
    description: 'Semifinals and finals featuring top university division athletes.',
    venueId: 2,
    venueName: 'Indoor Sports Arena',
    category: 'Sports',
    startTime: '2026-10-13T14:00:00',
    endTime: '2026-10-13T19:30:00',
    expectedAttendees: 700,
    currentAttendees: 580,
    status: 'LIVE',
    organizer: 'Campus Athletic Union'
  },
  {
    id: 3,
    title: 'Clubs & Societies Fair',
    description: 'Exhibition booths for all 40+ student clubs and extracurricular organizations.',
    venueId: 3,
    venueName: 'Student Center & Food Court',
    category: 'Cultural',
    startTime: '2026-10-13T11:00:00',
    endTime: '2026-10-13T17:00:00',
    expectedAttendees: 500,
    currentAttendees: 310,
    status: 'LIVE',
    organizer: 'Student Affairs Council'
  },
  {
    id: 4,
    title: 'Campus Acoustic Night & Jam',
    description: 'Live unplugged performances by campus bands and guest acoustic artists.',
    venueId: 4,
    venueName: 'Open Air Amphitheatre',
    category: 'Cultural',
    startTime: '2026-10-13T19:00:00',
    endTime: '2026-10-13T22:00:00',
    expectedAttendees: 1200,
    currentAttendees: 0,
    status: 'UPCOMING',
    organizer: 'Campus Music Society'
  }
];

const MOCK_LOGS = [
  {
    id: 1,
    venueId: 1,
    venueName: 'Grand University Auditorium',
    changeAmount: 50,
    flowType: 'INFLOW',
    gateName: 'Gate A - Main Lobby',
    resultingCount: 1080,
    timestamp: '2026-10-13T15:25:00',
    notes: 'Surge of attendees arriving for Keynote Session 2'
  },
  {
    id: 2,
    venueId: 2,
    venueName: 'Indoor Sports Arena',
    changeAmount: 35,
    flowType: 'INFLOW',
    gateName: 'Gate North - Bleacher Entry',
    resultingCount: 580,
    timestamp: '2026-10-13T15:18:00',
    notes: 'Halftime spectator movement'
  },
  {
    id: 3,
    venueId: 3,
    venueName: 'Student Center & Food Court',
    changeAmount: -20,
    flowType: 'OUTFLOW',
    gateName: 'Plaza Exit Turnstiles',
    resultingCount: 310,
    timestamp: '2026-10-13T15:12:00',
    notes: 'Lunch rush exit'
  }
];

const MOCK_ALERTS = [
  {
    id: 1,
    venueId: 1,
    venueName: 'Grand University Auditorium',
    alertLevel: 'CRITICAL',
    message: 'CRITICAL OVERCROWDING: Venue Grand University Auditorium is at 90.0% capacity (1080/1200). Recommend holding gate entry immediately!',
    occupancyPercentage: 90.0,
    timestamp: '2026-10-13T15:25:00',
    acknowledged: false
  },
  {
    id: 2,
    venueId: 2,
    venueName: 'Indoor Sports Arena',
    alertLevel: 'WARNING',
    message: 'HIGH OCCUPANCY WARNING: Venue Indoor Sports Arena reached 72.5% capacity (580/800). Safety marshals advised to monitor aisles.',
    occupancyPercentage: 72.5,
    timestamp: '2026-10-13T15:15:00',
    acknowledged: false
  }
];

export const api = {
  async getDashboardSummary() {
    try {
      const res = await fetch(`${API_BASE_URL}/crowd/summary`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_SUMMARY;
    }
  },

  async getVenues() {
    try {
      const res = await fetch(`${API_BASE_URL}/venues`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_VENUES;
    }
  },

  async getEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_EVENTS;
    }
  },

  async getLogs() {
    try {
      const res = await fetch(`${API_BASE_URL}/crowd/logs`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_LOGS;
    }
  },

  async getAlerts() {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_ALERTS;
    }
  },

  async getActiveAlerts() {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/active`);
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch {
      return MOCK_ALERTS.filter(a => !a.acknowledged);
    }
  },

  async updateCrowd(updateData) {
    try {
      const res = await fetch(`${API_BASE_URL}/crowd/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error('Failed to update crowd');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, simulating crowd update locally:', err);
      // Simulate locally
      const venue = MOCK_VENUES.find(v => v.id === updateData.venueId);
      if (venue) {
        venue.currentCount = Math.max(0, venue.currentCount + updateData.changeAmount);
        venue.occupancyRate = Math.round((venue.currentCount / venue.maxCapacity) * 1000) / 10;
        venue.status = venue.occupancyRate >= 90 ? 'CRITICAL' : venue.occupancyRate >= 70 ? 'WARNING' : 'NORMAL';
      }
      return venue;
    }
  },

  async resetVenue(venueId) {
    try {
      const res = await fetch(`${API_BASE_URL}/venues/${venueId}/reset`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to reset venue');
      return await res.json();
    } catch {
      const venue = MOCK_VENUES.find(v => v.id === venueId);
      if (venue) {
        venue.currentCount = 0;
        venue.occupancyRate = 0;
        venue.status = 'NORMAL';
      }
      return venue;
    }
  },

  async createEvent(eventData) {
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!res.ok) throw new Error('Failed to create event');
      return await res.json();
    } catch {
      const newEv = { id: Date.now(), ...eventData };
      MOCK_EVENTS.push(newEv);
      return newEv;
    }
  },

  async acknowledgeAlert(alertId) {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/acknowledge`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error('Failed to acknowledge alert');
      return await res.json();
    } catch {
      const alert = MOCK_ALERTS.find(a => a.id === alertId);
      if (alert) alert.acknowledged = true;
      return alert;
    }
  }
};
