package com.nirmaan.site.domain;

import com.nirmaan.common.entity.AuditableEntity;
import com.nirmaan.worker.domain.Worker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "construction_sites")
@Getter
@Setter
@NoArgsConstructor
public class ConstructionSite extends AuditableEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(name = "client_name", nullable = false, length = 100)
    private String clientName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ConstructionSiteStatus status = ConstructionSiteStatus.PLANNED;

    @OneToMany(mappedBy = "site")
    private List<Worker> workers = new ArrayList<>();
}
