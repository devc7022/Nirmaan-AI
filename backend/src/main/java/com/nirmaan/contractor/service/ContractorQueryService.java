package com.nirmaan.contractor.service;

import com.nirmaan.contractor.dto.ContractorQueryRequest;
import com.nirmaan.contractor.dto.ContractorQueryResponse;

import java.util.List;
import java.util.UUID;

public interface ContractorQueryService {
    ContractorQueryResponse submitContractorQuery(ContractorQueryRequest request);
    List<ContractorQueryResponse> getAllContractorQueries();
    ContractorQueryResponse getContractorQueryById(UUID id);
}
