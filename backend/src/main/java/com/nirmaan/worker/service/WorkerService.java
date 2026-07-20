package com.nirmaan.worker.service;

import com.nirmaan.worker.dto.WorkerMapper;
import com.nirmaan.worker.dto.WorkerRequest;
import com.nirmaan.worker.dto.WorkerResponse;
import com.nirmaan.worker.domain.Worker;
import com.nirmaan.worker.domain.WorkerStatus;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.site.repository.ConstructionSiteRepository;
import com.nirmaan.worker.repository.WorkerRepository;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkerService {

    private final WorkerRepository workerRepository;
    private final WorkerMapper workerMapper;
    private final ConstructionSiteRepository siteRepository;

    public Page<WorkerResponse> getWorkers(String name, String skill, WorkerStatus status, Pageable pageable) {
        Specification<Worker> spec = (root, query, cb) -> cb.conjunction();

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and(
                    (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.trim().toLowerCase() + "%"));
        }

        if (skill != null && !skill.trim().isEmpty()) {
            spec = spec.and((root, query, cb) -> {
                query.distinct(true);
                Join<Worker, String> skillsJoin = root.join("skills");
                return cb.like(cb.lower(skillsJoin), "%" + skill.trim().toLowerCase() + "%");
            });
        }

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        return workerRepository.findAll(spec, pageable).map(workerMapper::toResponse);
    }

    public WorkerResponse getWorkerById(UUID id) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found with ID: " + id));
        return workerMapper.toResponse(worker);
    }

    @Transactional
    public WorkerResponse createWorker(WorkerRequest request) {
        String email = cleanEmail(request.email());
        if (email != null && workerRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered for another worker");
        }

        Worker worker = workerMapper.toEntity(request);
        worker.setEmail(email);

        if (request.siteId() != null) {
            ConstructionSite site = siteRepository.findById(request.siteId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Construction site not found with ID: " + request.siteId()));
            worker.setSite(site);
        }

        Worker saved = workerRepository.save(worker);
        return workerMapper.toResponse(saved);
    }

    @Transactional
    public WorkerResponse updateWorker(UUID id, WorkerRequest request) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found with ID: " + id));

        String email = cleanEmail(request.email());
        if (email != null && workerRepository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered for another worker");
        }

        workerMapper.updateEntity(request, worker);
        worker.setEmail(email);

        if (request.siteId() != null) {
            ConstructionSite site = siteRepository.findById(request.siteId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Construction site not found with ID: " + request.siteId()));
            worker.setSite(site);
        } else {
            worker.setSite(null);
        }

        Worker updated = workerRepository.save(worker);
        return workerMapper.toResponse(updated);
    }

    @Transactional
    public void deleteWorker(UUID id) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Worker not found with ID: " + id));
        workerRepository.delete(worker);
    }

    private String cleanEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return null;
        }
        return email.trim().toLowerCase();
    }
}
