package com.nirmaan.contractor.service;

import com.nirmaan.contractor.domain.ContractorQuery;

public interface EmailService {
    boolean sendContractorQueryNotification(ContractorQuery query);
}
