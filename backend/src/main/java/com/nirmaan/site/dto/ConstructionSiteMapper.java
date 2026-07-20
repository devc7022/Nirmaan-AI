package com.nirmaan.site.dto;

import com.nirmaan.common.mapper.MapperConfig;
import com.nirmaan.site.domain.ConstructionSite;
import com.nirmaan.worker.domain.Worker;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class)
public interface ConstructionSiteMapper {

    @Mapping(target = "workers", source = "workers")
    ConstructionSiteResponse toResponse(ConstructionSite site);

    ConstructionSiteWorkerDto toWorkerDto(Worker worker);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "workers", ignore = true)
    ConstructionSite toEntity(ConstructionSiteRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "workers", ignore = true)
    void updateEntity(ConstructionSiteRequest request, @MappingTarget ConstructionSite site);
}
