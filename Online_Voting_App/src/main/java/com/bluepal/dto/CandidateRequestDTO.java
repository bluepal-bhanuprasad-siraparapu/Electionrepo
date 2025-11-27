package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateRequestDTO {
    private String name;
    private byte[] photo;      // BLOB from frontend
    private String bio;        // optional
    private Long partyId;
    private Long electionId;
}

