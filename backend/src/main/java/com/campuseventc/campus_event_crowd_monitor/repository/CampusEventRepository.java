package com.campuseventc.campus_event_crowd_monitor.repository;

import com.campuseventc.campus_event_crowd_monitor.model.CampusEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampusEventRepository extends JpaRepository<CampusEvent, Long> {
    List<CampusEvent> findByStatus(String status);
    List<CampusEvent> findByVenueId(Long venueId);
}
