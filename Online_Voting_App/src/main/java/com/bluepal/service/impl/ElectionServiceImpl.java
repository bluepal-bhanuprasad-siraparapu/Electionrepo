package com.bluepal.service.impl;

import com.bluepal.dto.CandidateResponseDTO;
import com.bluepal.dto.ElectionRequestDTO;
import com.bluepal.dto.ElectionResponseDTO;
import com.bluepal.dto.PartyResponseDTO;
import com.bluepal.entity.Election;
import com.bluepal.entity.ElectionStatus;
import com.bluepal.repository.ElectionRepository;
import com.bluepal.repository.AllowedVoterRepository;
import com.bluepal.service.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ElectionServiceImpl implements ElectionService {

    private final ElectionRepository electionRepo;
    private final AllowedVoterRepository allowedVoterRepo;

    // Save or update Election
    @Override
    public Election saveElection(Election election) {
        return electionRepo.save(election);
    }

    // Create Election from DTO
    public ElectionResponseDTO createElection(ElectionRequestDTO dto) {
        Election election = Election.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .status(ElectionStatus.NOT_STARTED) // default status
                .maxVoters(dto.getMaxVoters())
                .build();

        election = electionRepo.save(election);
        return mapToDTO(election);
    }

    // Map Election entity → DTO
    public ElectionResponseDTO mapToDTO(Election election) {
        return ElectionResponseDTO.builder()
                .id(election.getId())
                .title(election.getTitle())
                .description(election.getDescription())
                .startDate(election.getStartDate())
                .endDate(election.getEndDate())
                .status(election.getStatus().name())
                .maxVoters(election.getMaxVoters())
                .createdAt(election.getCreatedAt())
                .updatedAt(election.getUpdatedAt())
                .candidates(
                    election.getCandidates() != null
                        ? election.getCandidates().stream()
                            .map(candidate -> CandidateResponseDTO.builder()
                                .id(candidate.getId())
                                .name(candidate.getName())
                                .bio(candidate.getBio())
                                .photo(candidate.getPhoto())  // ✅ photo included
                                .party(
                                    PartyResponseDTO.builder()
                                        .id(candidate.getParty().getId())
                                        .name(candidate.getParty().getName())
                                        .description(candidate.getParty().getDescription())
                                        .logo(candidate.getParty().getLogo()) // ✅ party logo
                                        .build()
                                )
                                .build())
                            .collect(Collectors.toList())
                        : List.of()
                )
                .build();
    }



    // Find all Elections
    @Override
    public List<Election> findAll() {
        return electionRepo.findAll();
    }

    // Find by ID
    @Override
    public Optional<Election> findById(Long id) {
        return electionRepo.findById(id);
    }

    // Find by Status
    @Override
    public List<Election> findByStatus(ElectionStatus status) {
        return electionRepo.findByStatus(status);
    }

    // Delete Election
    @Override
    public void deleteElection(Long id) {
        electionRepo.deleteById(id);
    }

    // Optional: Update Election
    @Override
    public ElectionResponseDTO updateElection(Long id, ElectionRequestDTO dto) {
        Election existing = electionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        if (dto.getTitle() != null && !dto.getTitle().isEmpty()) {
            existing.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            existing.setDescription(dto.getDescription());
        }
        if (dto.getStartDate() != null) {
            existing.setStartDate(dto.getStartDate());
        }
        if (dto.getEndDate() != null) {
            existing.setEndDate(dto.getEndDate());
        }
        if (dto.getStatus() != null) {
            existing.setStatus(ElectionStatus.valueOf(dto.getStatus().toUpperCase()));
        }
        if (dto.getMaxVoters() != null) {
            existing.setMaxVoters(dto.getMaxVoters());
        }

        existing = electionRepo.save(existing);
        return mapToDTO(existing);
    }
}
