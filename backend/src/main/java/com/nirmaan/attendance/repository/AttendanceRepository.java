package com.nirmaan.attendance.repository;

import com.nirmaan.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, UUID>, JpaSpecificationExecutor<Attendance> {

    boolean existsByWorkerIdAndSiteIdAndAttendanceDate(UUID workerId, UUID siteId, LocalDate attendanceDate);

    List<Attendance> findByWorkerId(UUID workerId);

    List<Attendance> findBySiteId(UUID siteId);
}
