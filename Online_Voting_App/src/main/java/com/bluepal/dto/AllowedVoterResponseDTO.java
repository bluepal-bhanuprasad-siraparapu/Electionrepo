package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllowedVoterResponseDTO {
    private Long id;
    private String voterId;
    private ElectionResponseDTO election;
}
