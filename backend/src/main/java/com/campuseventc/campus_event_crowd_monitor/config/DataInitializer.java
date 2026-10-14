package com.campuseventc.campus_event_crowd_monitor.config;

import com.campuseventc.campus_event_crowd_monitor.model.CampusEvent;
import com.campuseventc.campus_event_crowd_monitor.model.CrowdAlert;
import com.campuseventc.campus_event_crowd_monitor.model.CrowdEntryLog;
import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.repository.CampusEventRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.CrowdAlertRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.CrowdEntryLogRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final VenueRepository venueRepository;
    private final CampusEventRepository eventRepository;
    private final CrowdEntryLogRepository entryLogRepository;
    private final CrowdAlertRepository alertRepository;

    @Override
    public void run(String... args) {
        if (venueRepository.count() > 0) {
            return;
        }

        // Initialize Venues
        Venue auditorium = Venue.builder()
                .code("AUD-01")
                .name("Grand University Auditorium")
                .location("Central Campus - Block A")
                .maxCapacity(1200)
                .currentCount(1080) // 90% -> CRITICAL
                .safetyThresholdPercent(85)
                .activeEventTitle("Annual Tech Innovation Summit 2026")
                .build();
        auditorium.calculateStatus();

        Venue stadium = Venue.builder()
                .code("STAD-02")
                .name("Indoor Sports Arena")
                .location("North Campus - Sports Complex")
                .maxCapacity(800)
                .currentCount(580) // 72.5% -> WARNING
                .safetyThresholdPercent(80)
                .activeEventTitle("Inter-College Basketball Championship")
                .build();
        stadium.calculateStatus();

        Venue studentCenter = Venue.builder()
                .code("STUC-03")
                .name("Student Center & Food Court")
                .location("Central Plaza - Ground Floor")
                .maxCapacity(600)
                .currentCount(310) // ~51% -> NORMAL
                .safetyThresholdPercent(85)
                .activeEventTitle("Clubs & Societies Fair")
                .build();
        studentCenter.calculateStatus();

        Venue amph = Venue.builder()
                .code("AMPH-04")
                .name("Open Air Amphitheatre")
                .location("South Lawn - Cultural Zone")
                .maxCapacity(1500)
                .currentCount(450) // 30% -> NORMAL
                .safetyThresholdPercent(85)
                .activeEventTitle("Campus Acoustic Night & Jam")
                .build();
        amph.calculateStatus();

        Venue semHall = Venue.builder()
                .code("SEM-05")
                .name("Turing Seminar Hall")
                .location("Engineering Block C - 3rd Floor")
                .maxCapacity(250)
                .currentCount(140) // 56% -> NORMAL
                .safetyThresholdPercent(85)
                .activeEventTitle("AI & Robotics Guest Lecture")
                .build();
        semHall.calculateStatus();

        List<Venue> savedVenues = venueRepository.saveAll(List.of(auditorium, stadium, studentCenter, amph, semHall));

        // Initialize Events
        CampusEvent event1 = CampusEvent.builder()
                .title("Annual Tech Innovation Summit 2026")
                .description("Keynote sessions, hackathon demos, and venture pitches from top student startups.")
                .venueId(savedVenues.get(0).getId())
                .venueName(savedVenues.get(0).getName())
                .category("Tech")
                .startTime(LocalDateTime.now().minusHours(2))
                .endTime(LocalDateTime.now().plusHours(4))
                .expectedAttendees(1100)
                .currentAttendees(1080)
                .status("LIVE")
                .organizer("Department of Computer Science")
                .build();

        CampusEvent event2 = CampusEvent.builder()
                .title("Inter-College Basketball Championship")
                .description("Semifinals and finals featuring top university division athletes.")
                .venueId(savedVenues.get(1).getId())
                .venueName(savedVenues.get(1).getName())
                .category("Sports")
                .startTime(LocalDateTime.now().minusHours(1))
                .endTime(LocalDateTime.now().plusHours(2))
                .expectedAttendees(700)
                .currentAttendees(580)
                .status("LIVE")
                .organizer("Campus Athletic Union")
                .build();

        CampusEvent event3 = CampusEvent.builder()
                .title("Clubs & Societies Fair")
                .description("Exhibition booths for all 40+ student clubs and extracurricular organizations.")
                .venueId(savedVenues.get(2).getId())
                .venueName(savedVenues.get(2).getName())
                .category("Cultural")
                .startTime(LocalDateTime.now().minusMinutes(45))
                .endTime(LocalDateTime.now().plusHours(3))
                .expectedAttendees(500)
                .currentAttendees(310)
                .status("LIVE")
                .organizer("Student Affairs Council")
                .build();

        CampusEvent event4 = CampusEvent.builder()
                .title("Campus Acoustic Night & Jam")
                .description("Live unplugged performances by campus bands and guest acoustic artists.")
                .venueId(savedVenues.get(3).getId())
                .venueName(savedVenues.get(3).getName())
                .category("Cultural")
                .startTime(LocalDateTime.now().plusHours(2))
                .endTime(LocalDateTime.now().plusHours(6))
                .expectedAttendees(1200)
                .currentAttendees(0)
                .status("UPCOMING")
                .organizer("Campus Music Society")
                .build();

        eventRepository.saveAll(List.of(event1, event2, event3, event4));

        // Initialize Entry Logs
        CrowdEntryLog log1 = CrowdEntryLog.builder()
                .venueId(savedVenues.get(0).getId())
                .venueName(savedVenues.get(0).getName())
                .eventId(event1.getId())
                .changeAmount(50)
                .flowType("INFLOW")
                .gateName("Gate A - Main Lobby")
                .resultingCount(1080)
                .timestamp(LocalDateTime.now().minusMinutes(5))
                .notes("Surge of attendees arriving for Keynote Session 2")
                .build();

        CrowdEntryLog log2 = CrowdEntryLog.builder()
                .venueId(savedVenues.get(1).getId())
                .venueName(savedVenues.get(1).getName())
                .eventId(event2.getId())
                .changeAmount(35)
                .flowType("INFLOW")
                .gateName("Gate North - Bleacher Entry")
                .resultingCount(580)
                .timestamp(LocalDateTime.now().minusMinutes(12))
                .notes("Halftime spectator movement")
                .build();

        CrowdEntryLog log3 = CrowdEntryLog.builder()
                .venueId(savedVenues.get(2).getId())
                .venueName(savedVenues.get(2).getName())
                .eventId(event3.getId())
                .changeAmount(-20)
                .flowType("OUTFLOW")
                .gateName("Plaza Exit Turnstiles")
                .resultingCount(310)
                .timestamp(LocalDateTime.now().minusMinutes(18))
                .notes("Lunch rush exit")
                .build();

        entryLogRepository.saveAll(List.of(log1, log2, log3));

        // Initialize Alerts
        CrowdAlert alert1 = CrowdAlert.builder()
                .venueId(savedVenues.get(0).getId())
                .venueName(savedVenues.get(0).getName())
                .alertLevel("CRITICAL")
                .message("CRITICAL OVERCROWDING: Venue 'Grand University Auditorium' is at 90.0% capacity (1080/1200). Recommend holding gate entry immediately!")
                .occupancyPercentage(90.0)
                .timestamp(LocalDateTime.now().minusMinutes(5))
                .acknowledged(false)
                .build();

        CrowdAlert alert2 = CrowdAlert.builder()
                .venueId(savedVenues.get(1).getId())
                .venueName(savedVenues.get(1).getName())
                .alertLevel("WARNING")
                .message("HIGH OCCUPANCY WARNING: Venue 'Indoor Sports Arena' reached 72.5% capacity (580/800). Safety marshals advised to monitor aisles.")
                .occupancyPercentage(72.5)
                .timestamp(LocalDateTime.now().minusMinutes(15))
                .acknowledged(false)
                .build();

        alertRepository.saveAll(List.of(alert1, alert2));
    }
}
