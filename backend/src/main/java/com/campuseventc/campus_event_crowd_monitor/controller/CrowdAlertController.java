package com.campuseventc.campus_event_crowd_monitor.controller;

import com.campuseventc.campus_event_crowd_monitor.model.CrowdAlert;
import com.campuseventc.campus_event_crowd_monitor.service.CrowdAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class CrowdAlertController {

    private final CrowdAlertService alertService;

    @GetMapping
    public ResponseEntity<List<CrowdAlert>> getRecentAlerts() {
        return ResponseEntity.ok(alertService.getRecentAlerts());
    }

    @GetMapping("/active")
    public ResponseEntity<List<CrowdAlert>> getActiveAlerts() {
        return ResponseEntity.ok(alertService.getActiveAlerts());
    }

    @PutMapping("/{id}/acknowledge")
    public ResponseEntity<CrowdAlert> acknowledgeAlert(@PathVariable Long id) {
        return ResponseEntity.ok(alertService.acknowledgeAlert(id));
    }
}
