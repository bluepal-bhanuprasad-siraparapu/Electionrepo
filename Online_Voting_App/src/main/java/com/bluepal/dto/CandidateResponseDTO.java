package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateResponseDTO {
    private Long id;
    private String name;
    private byte[] photo;
    private String bio;
    private PartyResponseDTO party;
    private ElectionResponseDTO election;
}
