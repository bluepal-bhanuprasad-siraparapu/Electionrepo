package com.bluepal.service;

import com.bluepal.dto.PartyRequestDTO;
import com.bluepal.dto.PartyResponseDTO;
import com.bluepal.entity.Party;
import java.util.List;
import java.util.Optional;

public interface PartyService {

    Party saveParty(Party party);

    Optional<Party> findById(Long id);

    Optional<Party> findByName(String name);

    List<Party> findAll();

    void deleteParty(Long id);
    
    public PartyResponseDTO updateParty(Long id, PartyRequestDTO dto);
}
