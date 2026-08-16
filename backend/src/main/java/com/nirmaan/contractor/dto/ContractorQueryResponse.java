package com.nirmaan.contractor.dto;

import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractorQueryResponse {

    private UUID id;
    private String contractorName;
    private String companyName;
    private String mobileNumber;
    private String email;
    private String projectName;
    private String projectLocation;
    private String siteAddress;
    private List<ManpowerRequirementDto> manpowerRequirements;
    private String workStartDate;
    private String expectedDuration;
    private Integer workingDays;
    private String workDescription;
    private String specialInstructions;
    private String status;
    private Instant createdAt;
    private boolean emailSent;
    private String message;
}
