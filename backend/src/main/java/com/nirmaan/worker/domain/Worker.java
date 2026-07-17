package com.nirmaan.worker.domain;

import com.nirmaan.common.entity.AuditableEntity;
import com.nirmaan.site.domain.ConstructionSite;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "workers")
@Getter
@Setter
@NoArgsConstructor
public class Worker extends AuditableEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, length = 320)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkerStatus status = WorkerStatus.ACTIVE;

    @Column(name = "hourly_rate", nullable = false, precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "worker_skills", joinColumns = @JoinColumn(name = "worker_id"))
    @Column(name = "skill", nullable = false, length = 50)
    private Set<String> skills = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id")
    private ConstructionSite site;
}
