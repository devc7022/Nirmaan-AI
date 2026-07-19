package com.nirmaan.ai.dto;

import java.time.LocalDate;

/**
 * Representation of the parsed details extracted by the AI model.
 */
public record AiAttendanceParsedDto(
    String workerName,
    String siteName,
    LocalDate attendanceDate,
    Double hoursWorked,
    Boolean present,
    String remarks
) {}
