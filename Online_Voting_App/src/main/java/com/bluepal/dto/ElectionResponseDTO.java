package com.bluepal.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ElectionResponseDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private List<CandidateResponseDTO> candidates;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer maxVoters;
}
