package com.campuseventc.campus_event_crowd_monitor.service;

import com.campuseventc.campus_event_crowd_monitor.model.CampusEvent;
import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.repository.CampusEventRepository;
import com.campuseventc.campus_event_crowd_monitor.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CampusEventService {

    private final CampusEventRepository eventRepository;
    private final VenueRepository venueRepository;

    public List<CampusEvent> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<CampusEvent> getLiveEvents() {
        return eventRepository.findByStatus("LIVE");
    }

    public CampusEvent getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found with id: " + id));
    }

    @Transactional
    public CampusEvent createEvent(CampusEvent event) {
        if (event.getVenueId() != null && (event.getVenueName() == null || event.getVenueName().isBlank())) {
            venueRepository.findById(event.getVenueId())
                    .ifPresent(v -> {
                        event.setVenueName(v.getName());
                        if ("LIVE".equalsIgnoreCase(event.getStatus())) {
                            v.setActiveEventTitle(event.getTitle());
                            venueRepository.save(v);
                        }
                    });
        }
        return eventRepository.save(event);
    }

    @Transactional
    public CampusEvent updateEvent(Long id, CampusEvent details) {
        CampusEvent event = getEventById(id);
        event.setTitle(details.getTitle());
        event.setDescription(details.getDescription());
        event.setCategory(details.getCategory());
        event.setVenueId(details.getVenueId());
        event.setVenueName(details.getVenueName());
        event.setStartTime(details.getStartTime());
        event.setEndTime(details.getEndTime());
        event.setExpectedAttendees(details.getExpectedAttendees());
        event.setStatus(details.getStatus());
        event.setOrganizer(details.getOrganizer());

        if (event.getVenueId() != null) {
            venueRepository.findById(event.getVenueId()).ifPresent(v -> {
                if ("LIVE".equalsIgnoreCase(event.getStatus())) {
                    v.setActiveEventTitle(event.getTitle());
                } else if (v.getActiveEventTitle() != null && v.getActiveEventTitle().equals(event.getTitle())) {
                    v.setActiveEventTitle(null);
                }
                venueRepository.save(v);
            });
        }

        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
