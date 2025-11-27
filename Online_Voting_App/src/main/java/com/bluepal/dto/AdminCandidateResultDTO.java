package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminCandidateResultDTO {
    private Long candidateId;
    private String candidateName;

    private byte[] candidatePhoto;  
    private String partyName;
    private byte[] partyLogo;

    private long voteCount;
    private double percentage;

    // ✅ Extra admin-only fields
    private String candidateBio;
    private Long electionId;
    private Long partyId;
}
