package com.nirmaan.worker.dto;

import com.nirmaan.common.mapper.MapperConfig;
import com.nirmaan.worker.domain.Worker;
import com.nirmaan.worker.dto.WorkerRequest;
import com.nirmaan.worker.dto.WorkerResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(config = MapperConfig.class, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkerMapper {

    @Mapping(target = "siteId", expression = "java(worker.getSite() != null ? worker.getSite().getId() : null)")
    @Mapping(target = "siteName", expression = "java(worker.getSite() != null ? worker.getSite().getName() : null)")
    WorkerResponse toResponse(Worker worker);

    Worker toEntity(WorkerRequest request);

    void updateEntity(WorkerRequest request, @MappingTarget Worker worker);
}
