package com.bluepal.entity;

public enum ElectionStatus {
    NOT_STARTED,   // Election created but not started yet
    ONGOING,       // Election is currently running
    COMPLETED,     // Election has ended
    CANCELLED      // Election cancelled by admin
}
