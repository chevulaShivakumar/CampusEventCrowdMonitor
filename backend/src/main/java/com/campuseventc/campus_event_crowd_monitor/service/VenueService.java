package com.campuseventc.campus_event_crowd_monitor.service;

import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venue not found with id: " + id));
    }

    public Venue createVenue(Venue venue) {
        venue.calculateStatus();
        return venueRepository.save(venue);
    }

    @Transactional
    public Venue updateVenue(Long id, Venue venueDetails) {
        Venue venue = getVenueById(id);
        venue.setName(venueDetails.getName());
        venue.setCode(venueDetails.getCode());
        venue.setLocation(venueDetails.getLocation());
        venue.setMaxCapacity(venueDetails.getMaxCapacity());
        if (venueDetails.getCurrentCount() != null) {
            venue.setCurrentCount(venueDetails.getCurrentCount());
        }
        if (venueDetails.getSafetyThresholdPercent() != null) {
            venue.setSafetyThresholdPercent(venueDetails.getSafetyThresholdPercent());
        }
        venue.setActiveEventTitle(venueDetails.getActiveEventTitle());
        venue.calculateStatus();
        return venueRepository.save(venue);
    }

    @Transactional
    public Venue resetVenueCount(Long id) {
        Venue venue = getVenueById(id);
        venue.setCurrentCount(0);
        venue.calculateStatus();
        return venueRepository.save(venue);
    }

    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
}
