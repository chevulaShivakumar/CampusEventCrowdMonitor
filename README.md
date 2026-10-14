# 🏛️ Campus Event Crowd Monitor

A full-stack web application designed for universities and colleges to track real-time venue crowd density, monitor campus event attendance, detect overcrowding, and trigger safety alerts.

---

## 📁 Project Architecture & Folder Structure

The project is structured into dedicated **Frontend (React)** and **Backend (Spring Boot)** modules:

```text
campus-event-crowd-monitor/
├── backend/                             # Spring Boot 3 REST API Service
│   ├── .mvn/                            # Maven wrapper configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/campuseventc/campus_event_crowd_monitor/
│   │   │   │   ├── config/
│   │   │   │   │   ├── CorsConfig.java          # Cross-Origin setup for React
│   │   │   │   │   └── DataInitializer.java     # Seeds realistic campus data
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AlertController.java     # /api/alerts
│   │   │   │   │   ├── CampusEventController.java # /api/events
│   │   │   │   │   ├── CrowdMonitorController.java # /api/crowd
│   │   │   │   │   └── VenueController.java     # /api/venues
│   │   │   │   ├── dto/
│   │   │   │   │   ├── CrowdUpdateDto.java
│   │   │   │   │   └── DashboardSummaryDto.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── CampusEvent.java         # Event entity
│   │   │   │   │   ├── CrowdAlert.java          # Overcrowding safety alerts
│   │   │   │   │   ├── CrowdEntryLog.java       # Gate entry/exit sensor logs
│   │   │   │   │   └── Venue.java               # Campus venue entity
│   │   │   │   ├── repository/
│   │   │   │   │   ├── CampusEventRepository.java
│   │   │   │   │   ├── CrowdAlertRepository.java
│   │   │   │   │   ├── CrowdEntryLogRepository.java
│   │   │   │   │   └── VenueRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── CampusEventService.java
│   │   │   │   │   ├── CrowdAlertService.java
│   │   │   │   │   ├── CrowdMonitorService.java
│   │   │   │   │   └── VenueService.java
│   │   │   │   └── CampusEventCrowdMonitorApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties       # H2 (in-memory) & MySQL config
│   │   └── test/
│   │       └── java/.../CampusEventCrowdMonitorApplicationTests.java
│   ├── mvnw                             # Linux/macOS Maven wrapper script
│   ├── mvnw.cmd                         # Windows Maven wrapper script
│   ├── pom.xml                          # Maven build configuration
│   └── README.md                        # Backend documentation
│
├── frontend/                            # React 18 + Vite Web Dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEventModal.jsx        # Event scheduling dialog
│   │   │   ├── AlertBanner.jsx          # Real-time incident banner
│   │   │   ├── CrowdSimulatorModal.jsx  # Interactive gate sensor simulator
│   │   │   ├── EventCard.jsx            # Event status & attendance card
│   │   │   ├── Navbar.jsx               # Navigation bar & active alert badge
│   │   │   ├── StatCard.jsx             # Key metric KPI card
│   │   │   └── VenueCard.jsx            # Live venue meter with quick adjustments
│   │   ├── pages/
│   │   │   ├── AlertsPage.jsx           # Incident & safety alert center
│   │   │   ├── CrowdLogPage.jsx         # Gate turnstile & sensor audit log
│   │   │   ├── Dashboard.jsx            # Real-time executive dashboard
│   │   │   ├── EventsPage.jsx           # Campus event directory
│   │   │   └── VenuesPage.jsx           # Venue occupancy & capacity management
│   │   ├── services/
│   │   │   └── api.js                   # REST API client with fallback simulation
│   │   ├── App.css                      # Modern dark/slate dashboard styles
│   │   ├── App.jsx                      # Main app component & polling
│   │   ├── index.css                    # Global design tokens and typography
│   │   └── main.jsx                     # React DOM entry point
│   ├── index.html                       # HTML5 template
│   ├── package.json                     # NPM packages & scripts
│   ├── vite.config.js                   # Vite configuration & backend proxy
│   └── README.md                        # Frontend documentation
│
├── .gitignore                           # Unified Git ignore rules
└── README.md                            # Main project documentation
```

---

## 🚀 Quick Start Guide

### 1. Run the Backend (Spring Boot)
Open a terminal in the `backend/` folder:

```bash
cd backend

# On Windows:
.\mvnw.cmd spring-boot:run

# On macOS/Linux:
./mvnw spring-boot:run
```
> The API will be live at: **`http://localhost:8080`**  
> In-memory H2 Console: **`http://localhost:8080/h2-console`**

---

### 2. Run the Frontend (React)
Open a second terminal in the `frontend/` folder:

```bash
cd frontend

# Install dependencies:
npm install

# Start Vite dev server:
npm run dev
```
> The web interface will open at: **`http://localhost:5173`**

---

## 🌟 Key Application Features

1. **Venue Capacity Monitoring**:
   - Calculates percentage occupancy dynamically.
   - Color-coded safety indicators:
     - 🟢 **NORMAL** (`< 70%` occupancy)
     - 🟡 **WARNING** (`70% - 89%` occupancy)
     - 🔴 **CRITICAL** (`>= 90%` occupancy)
2. **Interactive Crowd Simulator**:
   - Organizers can simulate gate sensors (+10, +25, +50, -10 attendees) at any entrance to observe instant threshold reactions.
3. **Automated Safety Incident Alerts**:
   - Automatically detects dangerous overcrowding levels and alerts campus safety marshals.
4. **Campus Events Calendar**:
   - Tracks ongoing hackathons, sports championships, guest lectures, and cultural nights.
5. **Turnstile & Gate Audit Logs**:
   - Complete audit trail of attendee inflow and outflow with gate IDs and timestamps.
