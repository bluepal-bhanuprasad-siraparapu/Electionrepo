package com.bluepal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String role;
    private String voterId;
    private String username;
    private String email;   // ✅ added
}
