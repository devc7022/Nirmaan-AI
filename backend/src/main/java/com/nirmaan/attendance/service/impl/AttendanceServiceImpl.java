package com.nirmaan.attendance.service.impl;

import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.attendance.entity.Attendance;
import com.nirmaan.attendance.mapper.AttendanceMapper;
import com.nirmaan.attendance.repository.AttendanceRepository;
import com.nirmaan.attendance.service.AttendanceService;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.site.repository.ConstructionSiteRepository;
import com.nirmaan.worker.domain.Worker;
import com.nirmaan.worker.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final WorkerRepository workerRepository;
    private final ConstructionSiteRepository siteRepository;
    private final AttendanceMapper attendanceMapper;

    @Override
    @Transactional
    public AttendanceResponseDto createAttendance(AttendanceRequestDto request) {
        Worker worker = workerRepository.findById(request.workerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found with ID: " + request.workerId()));

        ConstructionSite site = siteRepository.findById(request.siteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Construction site not found with ID: " + request.siteId()));

        if (attendanceRepository.existsByWorkerIdAndSiteIdAndAttendanceDate(request.workerId(), request.siteId(), request.attendanceDate())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Attendance record already exists for this worker, site, and date");
        }

        // Apply business rules:
        Boolean present = request.present();
        Double hoursWorked = request.hoursWorked();

        if (present == null) {
            present = false;
        }
        if (hoursWorked == null) {
            hoursWorked = 0.0;
        }

        if (hoursWorked > 0.0) {
            present = true;
        }
        if (!present) {
            hoursWorked = 0.0;
        }

        Attendance attendance = attendanceMapper.toEntity(request);
        attendance.setWorker(worker);
        attendance.setSite(site);
        attendance.setPresent(present);
        attendance.setHoursWorked(hoursWorked);

        Attendance saved = attendanceRepository.save(attendance);
        return attendanceMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public AttendanceResponseDto updateAttendance(UUID id, AttendanceRequestDto request) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance record not found with ID: " + id));

        // Check if the site is being updated
        if (!attendance.getSite().getId().equals(request.siteId())) {
            ConstructionSite site = siteRepository.findById(request.siteId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Construction site not found with ID: " + request.siteId()));

            // Validate duplicate with the new site (worker and date remain same from original record)
            if (attendanceRepository.existsByWorkerIdAndSiteIdAndAttendanceDate(
                    attendance.getWorker().getId(), request.siteId(), attendance.getAttendanceDate())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Attendance record already exists for this worker at the new site and date");
            }
            attendance.setSite(site);
        }

        // Apply business rules:
        Boolean present = request.present();
        Double hoursWorked = request.hoursWorked();

        if (present == null) {
            present = false;
        }
        if (hoursWorked == null) {
            hoursWorked = 0.0;
        }

        if (hoursWorked > 0.0) {
            present = true;
        }
        if (!present) {
            hoursWorked = 0.0;
        }

        attendance.setPresent(present);
        attendance.setHoursWorked(hoursWorked);
        attendance.setRemarks(request.remarks());

        Attendance updated = attendanceRepository.save(attendance);
        return attendanceMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteAttendance(UUID id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance record not found with ID: " + id));

        attendance.setDeleted(true);
        attendanceRepository.save(attendance);
    }

    @Override
    public AttendanceResponseDto getAttendanceById(UUID id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Attendance record not found with ID: " + id));

        return attendanceMapper.toResponse(attendance);
    }

    @Override
    public Page<AttendanceResponseDto> getAttendanceList(UUID workerId, UUID siteId, LocalDate attendanceDate, Boolean present, Pageable pageable) {
        Specification<Attendance> spec = (root, query, cb) -> cb.conjunction();

        if (workerId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("worker").get("id"), workerId));
        }

        if (siteId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("site").get("id"), siteId));
        }

        if (attendanceDate != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("attendanceDate"), attendanceDate));
        }

        if (present != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("present"), present));
        }

        return attendanceRepository.findAll(spec, pageable).map(attendanceMapper::toResponse);
    }
}
