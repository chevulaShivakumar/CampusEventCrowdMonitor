package com.campuseventc.campus_event_crowd_monitor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crowd_entry_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrowdEntryLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long venueId;

    private String venueName;

    private Long eventId;

    @Column(nullable = false)
    private Integer changeAmount; // e.g. +10 or -5

    @Column(nullable = false)
    private String flowType; // INFLOW, OUTFLOW, RESET

    private String gateName; // e.g. Gate 1, South Entrance, Scanner A

    private Integer resultingCount;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    private String notes;

    @PrePersist
    public void prePersist() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
