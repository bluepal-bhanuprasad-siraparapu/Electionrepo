package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateResultDTO {
    private Long candidateId;
    private String candidateName;

    private byte[] candidatePhoto;  // candidate image in bytes
    private String partyName;
    private byte[] partyLogo;       // party logo in bytes

    private long voteCount;
    private double percentage; // % of total votes
}
