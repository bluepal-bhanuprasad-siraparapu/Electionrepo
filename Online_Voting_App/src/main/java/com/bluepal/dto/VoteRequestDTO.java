package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoteRequestDTO {
    private String voterId;
    private Long candidateId;
    private Long electionId;
}
