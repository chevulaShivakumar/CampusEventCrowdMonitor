package com.campuseventc.campus_event_crowd_monitor.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrowdUpdateDto {

    @NotNull(message = "venueId is required")
    private Long venueId;

    private Long eventId;

    @NotNull(message = "changeAmount is required")
    private Integer changeAmount;

    private String gateName;

    private String flowType; // INFLOW, OUTFLOW, RESET, MANUAL

    private String notes;
}
