package com.bitanxen.app.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class ApplicationError {

    private HttpStatus status;
    private LocalDateTime timestamp;
    private String message;
    private String description;
    private List<ApplicationSubError> subErrors;

    private ApplicationError() {
        timestamp = LocalDateTime.now();
    }

    public ApplicationError(HttpStatus status, String message, Throwable ex) {
        this();
        this.status = status;
        this.message = message;
        this.description = ex.getLocalizedMessage();
    }
}