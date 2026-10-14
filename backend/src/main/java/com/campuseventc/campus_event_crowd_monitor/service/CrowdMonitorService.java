package com.campuseventc.campus_event_crowd_monitor.service;

import com.campuseventc.campus_event_crowd_monitor.dto.CrowdUpdateDto;
import com.campuseventc.campus_event_crowd_monitor.dto.DashboardSummaryDto;
import com.campuseventc.campus_event_crowd_monitor.model.CampusEvent;
import com.campuseventc.campus_event_crowd_monitor.model.CrowdEntryLog;
import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.repository.CampusEventRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.CrowdAlertRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.CrowdEntryLogRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrowdMonitorService {

    private final VenueRepository venueRepository;
    private final CampusEventRepository eventRepository;
    private final CrowdEntryLogRepository entryLogRepository;
    private final CrowdAlertRepository alertRepository;
    private final CrowdAlertService alertService;

    @Transactional
    public Venue applyCrowdUpdate(CrowdUpdateDto dto) {
        Venue venue = venueRepository.findById(dto.getVenueId())
                .orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + dto.getVenueId()));

        int current = venue.getCurrentCount() != null ? venue.getCurrentCount() : 0;
        int newCount = current + dto.getChangeAmount();
        if (newCount < 0) {
            newCount = 0;
        }

        venue.setCurrentCount(newCount);
        venue.calculateStatus();
        Venue savedVenue = venueRepository.save(venue);

        // Update active event attendee count if relevant
        if (dto.getEventId() != null) {
            eventRepository.findById(dto.getEventId()).ifPresent(ev -> {
                int evCurrent = ev.getCurrentAttendees() != null ? ev.getCurrentAttendees() : 0;
                ev.setCurrentAttendees(Math.max(0, evCurrent + dto.getChangeAmount()));
                eventRepository.save(ev);
            });
        }

        // Determine flow type
        String flowType = dto.getFlowType();
        if (flowType == null || flowType.isBlank()) {
            flowType = dto.getChangeAmount() >= 0 ? "INFLOW" : "OUTFLOW";
        }

        // Save entry log
        CrowdEntryLog log = CrowdEntryLog.builder()
                .venueId(venue.getId())
                .venueName(venue.getName())
                .eventId(dto.getEventId())
                .changeAmount(dto.getChangeAmount())
                .flowType(flowType)
                .gateName(dto.getGateName() != null ? dto.getGateName() : "Main Gate Sensor")
                .resultingCount(newCount)
                .timestamp(LocalDateTime.now())
                .notes(dto.getNotes())
                .build();
        entryLogRepository.save(log);

        // Check if alerts should be generated
        alertService.checkAndCreateAlertForVenue(savedVenue);

        return savedVenue;
    }

    public List<CrowdEntryLog> getRecentLogs() {
        return entryLogRepository.findTop20ByOrderByTimestampDesc();
    }

    public List<CrowdEntryLog> getLogsByVenue(Long venueId) {
        return entryLogRepository.findByVenueIdOrderByTimestampDesc(venueId);
    }

    public DashboardSummaryDto getDashboardSummary() {
        List<Venue> venues = venueRepository.findAll();
        List<CampusEvent> liveEvents = eventRepository.findByStatus("LIVE");

        long totalVenues = venues.size();
        long totalCapacity = venues.stream().mapToLong(v -> v.getMaxCapacity() != null ? v.getMaxCapacity() : 0).sum();
        long currentOccupancy = venues.stream().mapToLong(v -> v.getCurrentCount() != null ? v.getCurrentCount() : 0).sum();

        double overallPercent = totalCapacity > 0 ? ((double) currentOccupancy / totalCapacity) * 100.0 : 0.0;
        overallPercent = Math.round(overallPercent * 10.0) / 10.0;

        long criticalCount = venues.stream().filter(v -> "CRITICAL".equalsIgnoreCase(v.getStatus())).count();
        long warningCount = venues.stream().filter(v -> "WARNING".equalsIgnoreCase(v.getStatus())).count();
        long normalCount = venues.stream().filter(v -> "NORMAL".equalsIgnoreCase(v.getStatus())).count();

        long activeAlertsCount = alertRepository.findByAcknowledgedFalseOrderByTimestampDesc().size();

        return DashboardSummaryDto.builder()
                .totalVenues(totalVenues)
                .totalCapacity(totalCapacity)
                .currentOccupancy(currentOccupancy)
                .overallOccupancyPercent(overallPercent)
                .criticalVenuesCount(criticalCount)
                .warningVenuesCount(warningCount)
                .normalVenuesCount(normalCount)
                .activeEventsCount(liveEvents.size())
                .unacknowledgedAlertsCount(activeAlertsCount)
                .build();
    }
}
