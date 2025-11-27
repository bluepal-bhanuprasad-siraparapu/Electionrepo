package com.bluepal.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ElectionResultDTO {
    private Long electionId;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private long totalVotes;
    private List<CandidateResultDTO> candidateResults;
    private CandidateResultDTO winner;
}
