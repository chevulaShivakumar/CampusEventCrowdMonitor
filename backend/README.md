# Campus Event Crowd Monitor - Backend (Spring Boot)

This is the backend REST API service for the **Campus Event Crowd Monitor** system, built using **Java 17/21** and **Spring Boot 3.3.4**.

---

## 🚀 Features

- **Venue Crowd Tracking**: Real-time occupancy calculation, dynamic status determination (`NORMAL`, `WARNING`, `CRITICAL`).
- **Campus Event Management**: Track events, schedules, categories, expected vs live attendee counts.
- **Entry & Flow Logging**: Historical logs of gate check-ins, departures, and crowd fluctuations.
- **Automated Overcrowding Alerts**: Real-time warnings generated when venue occupancy exceeds safety thresholds (85% and 95%).
- **Plug-and-Play Database**: Uses in-memory H2 by default (no installation needed); fully prepared for MySQL.
- **Global CORS Configured**: Seamless integration with the React frontend.

---

## 📁 Package Architecture

```text
com.campuseventc.campus_event_crowd_monitor/
├── CampusEventCrowdMonitorApplication.java
├── config/
│   ├── CorsConfig.java           # Cross-Origin configuration for React
│   └── DataInitializer.java     # Seeds realistic campus data on startup
├── controller/
│   ├── VenueController.java      # REST endpoints: /api/venues
│   ├── CampusEventController.java# REST endpoints: /api/events
│   ├── CrowdMonitorController.java# REST endpoints: /api/crowd
│   └── CrowdAlertController.java # REST endpoints: /api/alerts
├── dto/
│   ├── CrowdUpdateDto.java
│   └── DashboardSummaryDto.java
├── model/
│   ├── Venue.java
│   ├── CampusEvent.java
│   ├── CrowdEntryLog.java
│   └── CrowdAlert.java
├── repository/
│   ├── VenueRepository.java
│   ├── CampusEventRepository.java
│   ├── CrowdEntryLogRepository.java
│   └── CrowdAlertRepository.java
└── service/
    ├── VenueService.java
    ├── CampusEventService.java
    ├── CrowdMonitorService.java
    └── CrowdAlertService.java
```

---

## 🛠️ How to Run

### Option 1: Using Maven Wrapper (CLI)
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux / macOS
./mvnw spring-boot:run
```

### Option 2: Using Installed Maven
```bash
mvn spring-boot:run
```

### Option 3: In IDE (IntelliJ IDEA, Eclipse, VS Code)
1. Open the `backend/` folder in your IDE.
2. Ensure Project SDK is set to **Java 17 or Java 21**.
3. Run the main class `com.campuseventc.campus_event_crowd_monitor.CampusEventCrowdMonitorApplication`.

The server will start on **`http://localhost:8080`**.

---

## 🗄️ Database Configuration

By default, the backend runs with an in-memory **H2 Database**:
- **H2 Console URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:crowd_monitor_db`
- **Username**: `sa`
- **Password**: *(leave blank)*

### Switching to MySQL:
Edit `src/main/resources/application.properties` and uncomment:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campus_crowd_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/crowd/summary` | Get aggregated campus crowd metrics |
| `GET` | `/api/venues` | Get list of all venues and live occupancy |
| `GET` | `/api/venues/{id}` | Get venue details |
| `POST` | `/api/venues` | Register a new venue |
| `PUT` | `/api/venues/{id}` | Update venue information |
| `PUT` | `/api/venues/{id}/reset` | Reset venue count to 0 |
| `POST` | `/api/crowd/update` | Post a crowd delta (`+N` or `-N` count) |
| `GET` | `/api/crowd/logs` | Fetch recent gate logs |
| `GET` | `/api/events` | List all scheduled and live campus events |
| `GET` | `/api/events/live` | List currently live events |
| `POST` | `/api/events` | Create a new campus event |
| `GET` | `/api/alerts` | List recent crowd alerts |
| `GET` | `/api/alerts/active` | List unacknowledged warning/critical alerts |
| `PUT` | `/api/alerts/{id}/acknowledge` | Acknowledge/dismiss an alert |
