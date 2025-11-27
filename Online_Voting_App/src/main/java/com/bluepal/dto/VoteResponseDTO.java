package com.bluepal.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoteResponseDTO {
    private Long id;
    private UserResponseDTO voter;
    private CandidateResponseDTO candidate;
    private ElectionResponseDTO election;
    private LocalDateTime castAt;
}
