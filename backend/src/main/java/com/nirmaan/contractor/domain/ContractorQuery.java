package com.nirmaan.contractor.domain;

import com.nirmaan.common.entity.AuditableEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contractor_queries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractorQuery extends AuditableEntity {

    @Column(name = "contractor_name", nullable = false, length = 150)
    private String contractorName;

    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;

    @Column(name = "mobile_number", nullable = false, length = 30)
    private String mobileNumber;

    @Column(nullable = false, length = 320)
    private String email;

    @Column(name = "project_name", nullable = false, length = 200)
    private String projectName;

    @Column(name = "project_location", nullable = false, length = 200)
    private String projectLocation;

    @Column(name = "site_address", nullable = false, columnDefinition = "TEXT")
    private String siteAddress;

    @Column(name = "work_start_date", length = 50)
    private String workStartDate;

    @Column(name = "expected_duration", length = 100)
    private String expectedDuration;

    @Column(name = "working_days")
    private Integer workingDays;

    @Column(name = "work_description", columnDefinition = "TEXT")
    private String workDescription;

    @Column(name = "special_instructions", columnDefinition = "TEXT")
    private String specialInstructions;

    @Builder.Default
    @Column(nullable = false, length = 30)
    private String status = "NEW";

    @Builder.Default
    @OneToMany(mappedBy = "contractorQuery", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ManpowerRequirement> manpowerRequirements = new ArrayList<>();

    public void addManpowerRequirement(ManpowerRequirement requirement) {
        manpowerRequirements.add(requirement);
        requirement.setContractorQuery(this);
    }
}
