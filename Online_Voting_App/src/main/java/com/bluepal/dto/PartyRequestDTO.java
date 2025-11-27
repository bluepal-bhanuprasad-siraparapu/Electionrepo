package com.bluepal.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartyRequestDTO {
    private String name;
    private String description; // optional
    private byte[] logo;        // BLOB from frontend
}
