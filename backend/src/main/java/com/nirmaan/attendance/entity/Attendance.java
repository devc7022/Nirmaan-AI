package com.nirmaan.attendance.entity;

import com.nirmaan.common.entity.AuditableEntity;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.worker.domain.Worker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
@SQLRestriction("deleted = false")
@Getter
@Setter
@NoArgsConstructor
public class Attendance extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private Worker worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id", nullable = false)
    private ConstructionSite site;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "hours_worked", nullable = false)
    private Double hoursWorked;

    @Column(nullable = false)
    private Boolean present;

    @Column(length = 500)
    private String remarks;

    @Column(nullable = false)
    private boolean deleted = false;
}
