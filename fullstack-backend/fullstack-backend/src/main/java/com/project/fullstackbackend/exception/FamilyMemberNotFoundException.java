package com.project.fullstackbackend.exception;

public class FamilyMemberNotFoundException extends RuntimeException {
    public FamilyMemberNotFoundException(Long id) {
        super("Could not find user with id " + id);
    }
}
