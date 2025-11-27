package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private String username;
    private String email;
    private String voterId; // only for voters
    private String role;    // ADMIN or VOTER
    private String password; // password from frontend
}
