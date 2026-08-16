package com.nirmaan.contractor.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nirmaan.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "manpower_requirements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ManpowerRequirement extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contractor_query_id", nullable = false)
    @JsonIgnore
    private ContractorQuery contractorQuery;

    @Column(name = "worker_type", nullable = false, length = 100)
    private String workerType;

    @Column(nullable = false)
    private Integer quantity;
}
