package com.campuseventc.campus_event_crowd_monitor.repository;

import com.campuseventc.campus_event_crowd_monitor.model.CrowdEntryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CrowdEntryLogRepository extends JpaRepository<CrowdEntryLog, Long> {
    List<CrowdEntryLog> findByVenueIdOrderByTimestampDesc(Long venueId);
    List<CrowdEntryLog> findTop20ByOrderByTimestampDesc();
}
