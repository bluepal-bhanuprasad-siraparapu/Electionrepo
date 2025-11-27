package com.bluepal.service.impl;

import com.bluepal.dto.PartyRequestDTO;
import com.bluepal.dto.PartyResponseDTO;
import com.bluepal.entity.Party;
import com.bluepal.repository.PartyRepository;
import com.bluepal.service.PartyService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService{

    private final PartyRepository partyRepo;

    // Save Party
    public Party saveParty(Party party) {
    	System.out.println("ps1");
        return partyRepo.save(party);
    }

    // Find by ID
    public Optional<Party> findById(Long id) {
        return partyRepo.findById(id);
    }

    // Find by Name
    public Optional<Party> findByName(String name) {
        return partyRepo.findByName(name);
    }

    // Get all Parties
    public List<Party> findAll() {
        return partyRepo.findAll();
    }

    // Delete Party
    public void deleteParty(Long id) {
        partyRepo.deleteById(id);
    }

    // Map Party → DTO (used by controller)
    public PartyResponseDTO mapToDTO(Party party) {
        return PartyResponseDTO.builder()
                .id(party.getId())
                .name(party.getName())
                .description(party.getDescription())
                .logo(party.getLogo())
                .build();
    }
    
    public PartyResponseDTO updateParty(Long id, PartyRequestDTO dto) {
        Party existingParty = partyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Party not found"));

        if (dto.getName() != null && !dto.getName().isEmpty()) {
            existingParty.setName(dto.getName());
        }

        if (dto.getDescription() != null) {
            existingParty.setDescription(dto.getDescription());
        }

        if (dto.getLogo() != null && dto.getLogo().length > 0) {
            existingParty.setLogo(dto.getLogo());
        }

        existingParty = partyRepo.save(existingParty);

        return mapToDTO(existingParty);
    }

}
