package com.bluepal.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartyResponseDTO {
    private Long id;
    private String name;
    private String description;
    private byte[] logo;
    private List<CandidateResponseDTO> candidates;
}
