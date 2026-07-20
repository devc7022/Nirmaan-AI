package com.nirmaan.site.service;

import com.nirmaan.site.dto.ConstructionSiteMapper;
import com.nirmaan.site.dto.ConstructionSiteRequest;
import com.nirmaan.site.dto.ConstructionSiteResponse;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.site.domain.ConstructionSiteStatus;
import com.nirmaan.site.repository.ConstructionSiteRepository;
import com.nirmaan.worker.domain.Worker;
import com.nirmaan.worker.repository.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ConstructionSiteService {

    private final ConstructionSiteRepository siteRepository;
    private final WorkerRepository workerRepository;
    private final ConstructionSiteMapper siteMapper;

    public Page<ConstructionSiteResponse> getSites(String name, ConstructionSiteStatus status, Pageable pageable) {
        Specification<ConstructionSite> spec = (root, query, cb) -> cb.conjunction();

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("name")), "%" + name.trim().toLowerCase() + "%")
            );
        }

        if (status != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        return siteRepository.findAll(spec, pageable).map(siteMapper::toResponse);
    }

    public ConstructionSiteResponse getSiteById(UUID id) {
        ConstructionSite site = siteRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Construction site not found with ID: " + id));
        return siteMapper.toResponse(site);
    }

    @Transactional
    public ConstructionSiteResponse createSite(ConstructionSiteRequest request) {
        ConstructionSite site = siteMapper.toEntity(request);
        ConstructionSite saved = siteRepository.save(site);

        assignWorkers(saved, request.workerIds());

        return siteMapper.toResponse(saved);
    }

    @Transactional
    public ConstructionSiteResponse updateSite(UUID id, ConstructionSiteRequest request) {
        ConstructionSite site = siteRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Construction site not found with ID: " + id));

        siteMapper.updateEntity(request, site);

        // 1. Clear previous worker assignments on both sides of relationship
        for (Worker worker : new ArrayList<>(site.getWorkers())) {
            worker.setSite(null);
            site.getWorkers().remove(worker);
        }

        // 2. Set new worker assignments
        assignWorkers(site, request.workerIds());

        ConstructionSite updated = siteRepository.save(site);
        return siteMapper.toResponse(updated);
    }

    @Transactional
    public void deleteSite(UUID id) {
        ConstructionSite site = siteRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Construction site not found with ID: " + id));

        // Unassign all workers before deleting the site
        for (Worker worker : site.getWorkers()) {
            worker.setSite(null);
        }
        siteRepository.delete(site);
    }

    private void assignWorkers(ConstructionSite site, Set<UUID> workerIds) {
        if (workerIds != null && !workerIds.isEmpty()) {
            List<Worker> workers = workerRepository.findAllById(workerIds);
            for (Worker worker : workers) {
                worker.setSite(site);
                site.getWorkers().add(worker);
            }
            workerRepository.saveAll(workers);
        }
    }
}
