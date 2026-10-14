# Campus Event Crowd Monitor - Frontend (React + Vite)

This is the web dashboard for the **Campus Event Crowd Monitor**, built with **React 18**, **Vite**, and **Lucide Icons**.

---

## 🚀 Features

- **Real-Time Capacity Dashboard**: Live occupancy counters, critical/warning badges, and status meters.
- **Interactive Crowd Simulation**: Inject gate sensor events (+/- attendees) from turnstiles or manual counts.
- **Campus Venues Explorer**: Filter by alert level (`NORMAL`, `WARNING`, `CRITICAL`) and location.
- **Event Management**: View live events, schedules, and expected attendee counts.
- **Gate Audit Trail**: Detailed timestamped inflow/outflow log.
- **Safety Incident Center**: Review and acknowledge automated overcrowding warnings.
- **Resilient Fallback**: Out-of-the-box mock data allows previewing the full UI even if the backend is not yet started.

---

## 🛠️ How to Run

### 1. Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The frontend will run at: **`http://localhost:5173`**

### 4. Build for Production
```bash
npm run build
```

---

## 🔗 Backend Connectivity

The development server is pre-configured with a reverse proxy in `vite.config.js`:
All requests to `/api/*` are forwarded to the Spring Boot server at `http://localhost:8080`.
