package com.campuseventc.campus_event_crowd_monitor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crowd_alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrowdAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long venueId;

    private String venueName;

    @Column(nullable = false)
    private String alertLevel; // INFO, WARNING, CRITICAL

    @Column(nullable = false, length = 1000)
    private String message;

    private Double occupancyPercentage;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(nullable = false)
    @Builder.Default
    private boolean acknowledged = false;

    @PrePersist
    public void prePersist() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
