package com.nirmaan.worker.repository;

import com.nirmaan.worker.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, UUID>, JpaSpecificationExecutor<Worker> {
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);
}
