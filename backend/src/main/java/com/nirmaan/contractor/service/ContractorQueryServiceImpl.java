package com.nirmaan.contractor.service;

import com.nirmaan.contractor.domain.ContractorQuery;
import com.nirmaan.contractor.domain.ManpowerRequirement;
import com.nirmaan.contractor.dto.ContractorQueryRequest;
import com.nirmaan.contractor.dto.ContractorQueryResponse;
import com.nirmaan.contractor.dto.ManpowerRequirementDto;
import com.nirmaan.contractor.repository.ContractorQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContractorQueryServiceImpl implements ContractorQueryService {

    private final ContractorQueryRepository repository;
    private final EmailService emailService;

    @Override
    @Transactional
    public ContractorQueryResponse submitContractorQuery(ContractorQueryRequest request) {
        ContractorQuery query = ContractorQuery.builder()
                .contractorName(request.getContractorName().trim())
                .companyName(request.getCompanyName().trim())
                .mobileNumber(request.getMobileNumber().trim())
                .email(request.getEmail().trim().toLowerCase())
                .projectName(request.getProjectName().trim())
                .projectLocation(request.getProjectLocation().trim())
                .siteAddress(request.getSiteAddress().trim())
                .workStartDate(request.getWorkStartDate() != null ? request.getWorkStartDate().trim() : null)
                .expectedDuration(request.getExpectedDuration() != null ? request.getExpectedDuration().trim() : null)
                .workingDays(request.getWorkingDays())
                .workDescription(request.getWorkDescription() != null ? request.getWorkDescription().trim() : null)
                .specialInstructions(request.getSpecialInstructions() != null ? request.getSpecialInstructions().trim() : null)
                .status("NEW")
                .manpowerRequirements(new ArrayList<>())
                .build();

        if (request.getManpowerRequirements() != null) {
            for (ManpowerRequirementDto dto : request.getManpowerRequirements()) {
                if (dto.getWorkerType() != null && !dto.getWorkerType().isBlank() && dto.getQuantity() != null && dto.getQuantity() > 0) {
                    ManpowerRequirement requirement = ManpowerRequirement.builder()
                            .workerType(dto.getWorkerType().trim())
                            .quantity(dto.getQuantity())
                            .build();
                    query.addManpowerRequirement(requirement);
                }
            }
        }

        ContractorQuery savedQuery = repository.save(query);
        log.info("Contractor requirement saved to database with ID: {}", savedQuery.getId());

        boolean emailSent = emailService.sendContractorQueryNotification(savedQuery);

        return mapToResponse(savedQuery, emailSent, emailSent 
                ? "Your contractor requirement submission has been received and emailed successfully." 
                : "Your contractor requirement has been submitted successfully.");
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContractorQueryResponse> getAllContractorQueries() {
        return repository.findAllByOrderByCreatedAtDesc().stream()
                .map(q -> mapToResponse(q, true, null))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ContractorQueryResponse getContractorQueryById(UUID id) {
        ContractorQuery query = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contractor query not found with id: " + id));
        return mapToResponse(query, true, null);
    }

    private ContractorQueryResponse mapToResponse(ContractorQuery query, boolean emailSent, String message) {
        List<ManpowerRequirementDto> manpowerDtos = query.getManpowerRequirements().stream()
                .map(m -> ManpowerRequirementDto.builder()
                        .workerType(m.getWorkerType())
                        .quantity(m.getQuantity())
                        .build())
                .collect(Collectors.toList());

        return ContractorQueryResponse.builder()
                .id(query.getId())
                .contractorName(query.getContractorName())
                .companyName(query.getCompanyName())
                .mobileNumber(query.getMobileNumber())
                .email(query.getEmail())
                .projectName(query.getProjectName())
                .projectLocation(query.getProjectLocation())
                .siteAddress(query.getSiteAddress())
                .manpowerRequirements(manpowerDtos)
                .workStartDate(query.getWorkStartDate())
                .expectedDuration(query.getExpectedDuration())
                .workingDays(query.getWorkingDays())
                .workDescription(query.getWorkDescription())
                .specialInstructions(query.getSpecialInstructions())
                .status(query.getStatus())
                .createdAt(query.getCreatedAt())
                .emailSent(emailSent)
                .message(message)
                .build();
    }
}
