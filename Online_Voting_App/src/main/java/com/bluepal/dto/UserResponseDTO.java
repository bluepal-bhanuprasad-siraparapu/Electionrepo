package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
	private Long id;
    private String username;
    private String email;
    private String voterId;
    private String role;
}
