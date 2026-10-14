package com.campuseventc.campus_event_crowd_monitor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "venues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private String location;

    @Column(nullable = false)
    private Integer maxCapacity;

    @Column(nullable = false)
    private Integer currentCount;

    @Column(nullable = false)
    @Builder.Default
    private Integer safetyThresholdPercent = 85;

    /**
     * NORMAL (<70%), WARNING (70-89%), CRITICAL (>=90%)
     */
    @Column(nullable = false)
    @Builder.Default
    private String status = "NORMAL";

    private String activeEventTitle;

    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void calculateStatus() {
        if (currentCount == null) currentCount = 0;
        if (maxCapacity == null || maxCapacity <= 0) maxCapacity = 100;

        double percentage = ((double) currentCount / maxCapacity) * 100.0;
        if (percentage >= 90.0) {
            this.status = "CRITICAL";
        } else if (percentage >= 70.0) {
            this.status = "WARNING";
        } else {
            this.status = "NORMAL";
        }
        this.updatedAt = LocalDateTime.now();
    }

    public double getOccupancyRate() {
        if (maxCapacity == null || maxCapacity <= 0) return 0.0;
        return Math.round(((double) (currentCount != null ? currentCount : 0) / maxCapacity) * 1000.0) / 10.0;
    }
}
