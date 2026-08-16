package com.nirmaan.contractor.repository;

import com.nirmaan.contractor.domain.ContractorQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContractorQueryRepository extends JpaRepository<ContractorQuery, UUID> {
    List<ContractorQuery> findByEmailOrderByCreatedAtDesc(String email);
    List<ContractorQuery> findAllByOrderByCreatedAtDesc();
}
