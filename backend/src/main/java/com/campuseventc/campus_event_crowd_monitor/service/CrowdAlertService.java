package com.campuseventc.campus_event_crowd_monitor.service;

import com.campuseventc.campus_event_crowd_monitor.model.CrowdAlert;
import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.repository.CrowdAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrowdAlertService {

    private final CrowdAlertRepository alertRepository;

    public List<CrowdAlert> getActiveAlerts() {
        return alertRepository.findByAcknowledgedFalseOrderByTimestampDesc();
    }

    public List<CrowdAlert> getRecentAlerts() {
        return alertRepository.findTop20ByOrderByTimestampDesc();
    }

    public CrowdAlert acknowledgeAlert(Long alertId) {
        CrowdAlert alert = alertRepository.findById(alertId)
                .orElseThrow(() -> new IllegalArgumentException("Alert not found with id: " + alertId));
        alert.setAcknowledged(true);
        return alertRepository.save(alert);
    }

    public void checkAndCreateAlertForVenue(Venue venue) {
        double occupancy = venue.getOccupancyRate();

        if (occupancy >= 95.0) {
            createAlert(venue, "CRITICAL",
                    String.format("CRITICAL OVERCROWDING: Venue '%s' is at %.1f%% capacity (%d/%d). Recommend closing entry gates immediately!",
                            venue.getName(), occupancy, venue.getCurrentCount(), venue.getMaxCapacity()));
        } else if (occupancy >= 85.0) {
            createAlert(venue, "WARNING",
                    String.format("HIGH OCCUPANCY WARNING: Venue '%s' reached %.1f%% capacity (%d/%d). Monitor incoming crowd flow.",
                            venue.getName(), occupancy, venue.getCurrentCount(), venue.getMaxCapacity()));
        }
    }

    public CrowdAlert createAlert(Venue venue, String alertLevel, String message) {
        CrowdAlert alert = CrowdAlert.builder()
                .venueId(venue.getId())
                .venueName(venue.getName())
                .alertLevel(alertLevel)
                .message(message)
                .occupancyPercentage(venue.getOccupancyRate())
                .timestamp(LocalDateTime.now())
                .acknowledged(false)
                .build();
        return alertRepository.save(alert);
    }
}
