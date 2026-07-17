package com.nirmaan.site.repository;

import com.nirmaan.site.domain.ConstructionSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ConstructionSiteRepository extends JpaRepository<ConstructionSite, UUID>, JpaSpecificationExecutor<ConstructionSite> {
}
