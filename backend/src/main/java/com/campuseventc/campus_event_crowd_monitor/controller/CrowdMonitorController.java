package com.campuseventc.campus_event_crowd_monitor.controller;

import com.campuseventc.campus_event_crowd_monitor.dto.CrowdUpdateDto;
import com.campuseventc.campus_event_crowd_monitor.dto.DashboardSummaryDto;
import com.campuseventc.campus_event_crowd_monitor.model.CrowdEntryLog;
import com.campuseventc.campus_event_crowd_monitor.model.Venue;
import com.campuseventc.campus_event_crowd_monitor.service.CrowdMonitorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crowd")
@RequiredArgsConstructor
public class CrowdMonitorController {

    private final CrowdMonitorService crowdMonitorService;

    @PostMapping("/update")
    public ResponseEntity<Venue> updateCrowd(@Valid @RequestBody CrowdUpdateDto dto) {
        Venue updated = crowdMonitorService.applyCrowdUpdate(dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDto> getSummary() {
        return ResponseEntity.ok(crowdMonitorService.getDashboardSummary());
    }

    @GetMapping("/logs")
    public ResponseEntity<List<CrowdEntryLog>> getRecentLogs() {
        return ResponseEntity.ok(crowdMonitorService.getRecentLogs());
    }

    @GetMapping("/logs/{venueId}")
    public ResponseEntity<List<CrowdEntryLog>> getLogsByVenue(@PathVariable Long venueId) {
        return ResponseEntity.ok(crowdMonitorService.getLogsByVenue(venueId));
    }
}
