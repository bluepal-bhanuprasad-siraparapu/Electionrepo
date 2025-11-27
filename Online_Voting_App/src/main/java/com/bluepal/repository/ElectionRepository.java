package com.bluepal.repository;

import com.bluepal.entity.Election;
import com.bluepal.entity.ElectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {

    List<Election> findByStatus(ElectionStatus status);

    List<Election> findByStartDateBeforeAndEndDateAfter(java.time.LocalDateTime now1, java.time.LocalDateTime now2);

    List<Election> findByTitleContainingIgnoreCase(String title);
}
