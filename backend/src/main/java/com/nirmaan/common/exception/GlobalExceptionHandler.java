package com.nirmaan.common.exception;

import com.nirmaan.common.api.ApiError;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new LinkedHashMap<>(); ex.getBindingResult().getAllErrors().forEach(error -> errors.put(((FieldError) error).getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(new ApiError(Instant.now(), 400, "Bad Request", "Validation failed", request.getRequestURI(), errors));
    }
    @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<ApiError> invalidArgument(IllegalArgumentException ex, HttpServletRequest request) { return ResponseEntity.badRequest().body(ApiError.of(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI())); }
    @ExceptionHandler(ResponseStatusException.class) ResponseEntity<ApiError> responseStatus(ResponseStatusException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        return ResponseEntity.status(status).body(ApiError.of(status, ex.getReason() == null ? status.getReasonPhrase() : ex.getReason(), request.getRequestURI()));
    }
    @ExceptionHandler(PropertyReferenceException.class) ResponseEntity<ApiError> propertyReference(PropertyReferenceException ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(ApiError.of(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI()));
    }
    @ExceptionHandler(Exception.class) ResponseEntity<ApiError> unexpected(Exception ex, HttpServletRequest request) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiError.of(HttpStatus.INTERNAL_SERVER_ERROR, ex.getClass().getSimpleName() + ": " + ex.getMessage(), request.getRequestURI()));
    }
}
