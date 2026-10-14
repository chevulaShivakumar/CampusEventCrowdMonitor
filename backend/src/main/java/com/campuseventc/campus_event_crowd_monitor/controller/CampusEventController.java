package com.campuseventc.campus_event_crowd_monitor.controller;

import com.campuseventc.campus_event_crowd_monitor.model.CampusEvent;
import com.campuseventc.campus_event_crowd_monitor.service.CampusEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class CampusEventController {

    private final CampusEventService eventService;

    @GetMapping
    public ResponseEntity<List<CampusEvent>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/live")
    public ResponseEntity<List<CampusEvent>> getLiveEvents() {
        return ResponseEntity.ok(eventService.getLiveEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampusEvent> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    public ResponseEntity<CampusEvent> createEvent(@RequestBody CampusEvent event) {
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampusEvent> updateEvent(@PathVariable Long id, @RequestBody CampusEvent event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
