package com.bluepal.service.impl;

import com.bluepal.dto.*;
import com.bluepal.entity.*;
import com.bluepal.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl {

    private final VoteRepository voteRepo;
    private final UserRepository userRepo;
    private final CandidateRepository candidateRepo;
    private final ElectionRepository electionRepo;
    private final AllowedVoterRepository allowedVoterRepo;

    // ------------------ Cast a vote ------------------
    public VoteResponseDTO castVote(VoteRequestDTO dto) {

        User voter = userRepo.findByVoterId(dto.getVoterId())
                .orElseThrow(() -> new RuntimeException("Voter not found"));

        Election election = electionRepo.findById(dto.getElectionId())
                .orElseThrow(() -> new RuntimeException("Election not found"));

        Candidate candidate = candidateRepo.findById(dto.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // Check if voter is allowed
        allowedVoterRepo.findByVoterIdAndElection(voter.getVoterId(), election)
                .orElseThrow(() -> new RuntimeException("Voter not allowed for this election"));

        // Check if already voted
        if (voteRepo.findByVoterAndElection(voter, election).isPresent()) {
            throw new RuntimeException("Voter has already voted");
        }

        Vote vote = Vote.builder()
                .voter(voter)
                .candidate(candidate)
                .election(election)
                .build();

        vote = voteRepo.save(vote);

        return mapToDTO(vote);
    }

    // ------------------ Map Vote entity → DTO ------------------
    public VoteResponseDTO mapToDTO(Vote vote) {
        return VoteResponseDTO.builder()
                .id(vote.getId())
                .voter(mapUserToDTO(vote.getVoter()))
                .candidate(mapCandidateToDTO(vote.getCandidate()))
                .election(mapElectionToDTO(vote.getElection()))
                .castAt(vote.getCastAt())
                .build();
    }

    private UserResponseDTO mapUserToDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .voterId(user.getVoterId())
                .role(user.getRole().name())
                .build();
    }

    private CandidateResponseDTO mapCandidateToDTO(Candidate candidate) {
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
                .election(mapElectionToDTO(candidate.getElection()))
                .build();
    }

    private ElectionResponseDTO mapElectionToDTO(Election election) {
        return ElectionResponseDTO.builder()
                .id(election.getId())
                .title(election.getTitle())
                .description(election.getDescription())
                .startDate(election.getStartDate())
                .endDate(election.getEndDate())
                .status(election.getStatus().name())
                .maxVoters(election.getMaxVoters())
                .build();
    }
    
 // ------------------ Get Elections Voter Participated In ------------------
    public List<ElectionResponseDTO> getParticipatedElections(String voterId) {
        User voter = userRepo.findByVoterId(voterId)
                .orElseThrow(() -> new RuntimeException("Voter not found"));

        List<Vote> votes = voteRepo.findByVoter(voter);

        // Extract unique elections and map to DTOs
        return votes.stream()
                .map(Vote::getElection)
                .distinct()
                .map(this::mapElectionToDTO)
                .collect(Collectors.toList());
    }


    // ------------------ Additional CRUD methods ------------------
    public Optional<Vote> findById(Long id) {
        return voteRepo.findById(id);
    }

    public Optional<Vote> findByVoterAndElection(User voter, Election election) {
        return voteRepo.findByVoterAndElection(voter, election);
    }

    public List<Vote> findByElection(Election election) {
        return voteRepo.findByElection(election);
    }

    public List<Vote> findByCandidate(Candidate candidate) {
        return voteRepo.findByCandidate(candidate);
    }

    public void deleteVote(Long id) {
        if (!voteRepo.existsById(id)) {
            throw new RuntimeException("Vote not found");
        }
        voteRepo.deleteById(id);
    }

    public List<Vote> findAllVotes() {
        return voteRepo.findAll();
    }
}
