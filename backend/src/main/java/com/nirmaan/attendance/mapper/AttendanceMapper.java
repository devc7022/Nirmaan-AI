package com.nirmaan.attendance.mapper;

import com.nirmaan.attendance.entity.Attendance;
import com.nirmaan.attendance.dto.AttendanceRequestDto;
import com.nirmaan.attendance.dto.AttendanceResponseDto;
import com.nirmaan.common.mapper.MapperConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class)
public interface AttendanceMapper {

    @Mapping(target = "workerId", source = "worker.id")
    @Mapping(target = "workerName", source = "worker.name")
    @Mapping(target = "siteId", source = "site.id")
    @Mapping(target = "siteName", source = "site.name")
    AttendanceResponseDto toResponse(Attendance attendance);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "worker", ignore = true)
    @Mapping(target = "site", ignore = true)
    Attendance toEntity(AttendanceRequestDto request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "worker", ignore = true)
    @Mapping(target = "site", ignore = true)
    void updateEntity(AttendanceRequestDto request, @MappingTarget Attendance attendance);
}
