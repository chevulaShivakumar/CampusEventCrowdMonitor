import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import VenuesPage from './pages/VenuesPage';
import EventsPage from './pages/EventsPage';
import CrowdLogPage from './pages/CrowdLogPage';
import AlertsPage from './pages/AlertsPage';
import CrowdSimulatorModal from './components/CrowdSimulatorModal';
import AddEventModal from './components/AddEventModal';
import { api } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [summary, setSummary] = useState({});
  const [venues, setVenues] = useState([]);
  const [events, setEvents] = useState([]);
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sumRes, venRes, evRes, logRes, alRes] = await Promise.all([
        api.getDashboardSummary(),
        api.getVenues(),
        api.getEvents(),
        api.getLogs(),
        api.getActiveAlerts()
      ]);
      setSummary(sumRes);
      setVenues(venRes);
      setEvents(evRes);
      setLogs(logRes);
      setAlerts(alRes);
    } catch (err) {
      console.error('Failed to load crowd data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Auto-refresh every 20 seconds for real-time monitoring
    const interval = setInterval(loadData, 20000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleQuickUpdate = async (venueId, changeAmount) => {
    await api.updateCrowd({
      venueId,
      changeAmount,
      flowType: changeAmount > 0 ? 'INFLOW' : 'OUTFLOW',
      gateName: 'Direct Campus Monitor Control',
      notes: `Manual adjustment of ${changeAmount > 0 ? '+' : ''}${changeAmount} attendees`
    });
    loadData();
  };

  const handleResetVenue = async (venueId) => {
    if (window.confirm('Reset this venue crowd count to 0?')) {
      await api.resetVenue(venueId);
      loadData();
    }
  };

  const handleSimulate = async (data) => {
    await api.updateCrowd(data);
    loadData();
  };

  const handleAddEvent = async (eventData) => {
    await api.createEvent(eventData);
    loadData();
  };

  const handleAcknowledgeAlert = async (alertId) => {
    await api.acknowledgeAlert(alertId);
    loadData();
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={alerts.length}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onRefresh={loadData}
        loading={loading}
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            summary={summary}
            venues={venues}
            events={events}
            logs={logs}
            alerts={alerts}
            onQuickUpdate={handleQuickUpdate}
            onResetVenue={handleResetVenue}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'venues' && (
          <VenuesPage
            venues={venues}
            onQuickUpdate={handleQuickUpdate}
            onResetVenue={handleResetVenue}
          />
        )}

        {activeTab === 'events' && (
          <EventsPage
            events={events}
            onOpenAddEvent={() => setIsAddEventOpen(true)}
          />
        )}

        {activeTab === 'logs' && (
          <CrowdLogPage logs={logs} />
        )}

        {activeTab === 'alerts' && (
          <AlertsPage
            alerts={alerts}
            onAcknowledge={handleAcknowledgeAlert}
          />
        )}
      </main>

      <CrowdSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        venues={venues}
        onSimulate={handleSimulate}
      />

      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        venues={venues}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
