package com.nirmaan.common.mapper;

import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@org.mapstruct.MapperConfig(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface MapperConfig { }
