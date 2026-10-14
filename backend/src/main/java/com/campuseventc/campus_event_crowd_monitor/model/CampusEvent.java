package com.campuseventc.campus_event_crowd_monitor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "campus_events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampusEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private Long venueId;

    private String venueName;

    private String category; // Tech, Cultural, Sports, Academic, Workshop

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Integer expectedAttendees;

    private Integer currentAttendees;

    @Column(nullable = false)
    @Builder.Default
    private String status = "UPCOMING"; // UPCOMING, LIVE, CONCLUDED, CANCELLED

    private String organizer;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (currentAttendees == null) {
            currentAttendees = 0;
        }
    }
}
