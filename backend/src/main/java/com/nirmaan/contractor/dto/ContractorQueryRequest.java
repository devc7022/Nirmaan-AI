package com.nirmaan.contractor.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContractorQueryRequest {

    @NotBlank(message = "Contractor name is required")
    private String contractorName;

    @NotBlank(message = "Company or business name is required")
    private String companyName;

    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Project or site name is required")
    private String projectName;

    @NotBlank(message = "Project location is required")
    private String projectLocation;

    @NotBlank(message = "Site address is required")
    private String siteAddress;

    @NotEmpty(message = "At least one manpower requirement is required")
    @Valid
    private List<ManpowerRequirementDto> manpowerRequirements;

    private String workStartDate;
    private String expectedDuration;
    private Integer workingDays;
    private String workDescription;
    private String specialInstructions;
}
