package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllowedVoterRequestDTO {
    private String voterId;
    private Long electionId;
}
