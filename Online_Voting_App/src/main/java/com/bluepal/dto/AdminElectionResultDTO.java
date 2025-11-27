package com.bluepal.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminElectionResultDTO {
    private Long electionId;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private long totalVotes;

    private List<AdminCandidateResultDTO> candidateResults;
    private AdminCandidateResultDTO winner;
}
