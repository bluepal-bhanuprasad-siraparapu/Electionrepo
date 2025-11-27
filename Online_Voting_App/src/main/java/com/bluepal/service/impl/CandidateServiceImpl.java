package com.bluepal.service.impl;

import com.bluepal.dto.CandidateRequestDTO;
import com.bluepal.dto.CandidateResponseDTO;
import com.bluepal.dto.ElectionResponseDTO;
import com.bluepal.dto.PartyResponseDTO;
import com.bluepal.entity.Candidate;
import com.bluepal.entity.Party;
import com.bluepal.entity.Election;
import com.bluepal.repository.CandidateRepository;
import com.bluepal.repository.PartyRepository;
import com.bluepal.service.CandidateService;
import com.bluepal.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository candidateRepo;
    private final PartyRepository partyRepo;
    private final ElectionRepository electionRepo;

    public CandidateResponseDTO createCandidate(CandidateRequestDTO dto) {
        Party party = partyRepo.findById(dto.getPartyId())
                .orElseThrow(() -> new RuntimeException("Party not found"));

        Election election = electionRepo.findById(dto.getElectionId())
                .orElseThrow(() -> new RuntimeException("Election not found"));

        Candidate candidate = Candidate.builder()
                .name(dto.getName())
                .photo(dto.getPhoto())
                .bio(dto.getBio())
                .party(party)
                .election(election)
                .build();

        candidate = candidateRepo.save(candidate);
        return mapToDTO(candidate);
    }

    public CandidateResponseDTO mapToDTO(Candidate candidate) {
        return CandidateResponseDTO.builder()
                .id(candidate.getId())
                .name(candidate.getName())
                .photo(candidate.getPhoto())
                .bio(candidate.getBio())
                .party(PartyResponseDTO.builder()
                        .id(candidate.getParty().getId())
                        .name(candidate.getParty().getName())
                        .logo(candidate.getParty().getLogo())
                        .description(candidate.getParty().getDescription())
                        .build())
                .election(ElectionResponseDTO.builder()
                        .id(candidate.getElection().getId())
                        .title(candidate.getElection().getTitle())
                        .description(candidate.getElection().getDescription())
                        .startDate(candidate.getElection().getStartDate())
                        .endDate(candidate.getElection().getEndDate())
                        .status(candidate.getElection().getStatus().name())
                        .build())
                .build();
    }


    public List<CandidateResponseDTO> getAllCandidates() {
        return candidateRepo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public Optional<Candidate> findById(Long id) {
        return candidateRepo.findById(id);
    }

    public List<Candidate> findByElection(Election election) {
        return candidateRepo.findByElection(election);
    }

    public List<Candidate> findByParty(Party party) {
        return candidateRepo.findByParty(party);
    }

    public void deleteCandidate(Long id) {
        candidateRepo.deleteById(id);
    }

	@Override
	public Candidate saveCandidate(Candidate candidate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Candidate> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public CandidateResponseDTO updateCandidate(Long id, CandidateRequestDTO dto) {
	    Candidate existing = candidateRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Candidate not found"));

	    if (dto.getName() != null && !dto.getName().isEmpty()) {
	        existing.setName(dto.getName());
	    }

	    if (dto.getBio() != null) {
	        existing.setBio(dto.getBio());
	    }

	    if (dto.getPhoto() != null && dto.getPhoto().length > 0) {
	        existing.setPhoto(dto.getPhoto());
	    }

	    if (dto.getPartyId() != null) {
	        Party party = partyRepo.findById(dto.getPartyId())
	                .orElseThrow(() -> new RuntimeException("Party not found"));
	        existing.setParty(party);
	    }

	    if (dto.getElectionId() != null) {
	        Election election = electionRepo.findById(dto.getElectionId())
	                .orElseThrow(() -> new RuntimeException("Election not found"));
	        existing.setElection(election);
	    }

	    existing = candidateRepo.save(existing);
	    return mapToDTO(existing);
	}

}
