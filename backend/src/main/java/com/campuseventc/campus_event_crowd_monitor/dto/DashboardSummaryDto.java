package com.campuseventc.campus_event_crowd_monitor.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {
    private long totalVenues;
    private long totalCapacity;
    private long currentOccupancy;
    private double overallOccupancyPercent;
    private long criticalVenuesCount;
    private long warningVenuesCount;
    private long normalVenuesCount;
    private long activeEventsCount;
    private long unacknowledgedAlertsCount;
}
