package com.bluepal.controller;

import com.bluepal.dto.AdminCandidateResultDTO;
import com.bluepal.dto.AdminElectionResultDTO;
import com.bluepal.entity.Candidate;
import com.bluepal.entity.Election;
import com.bluepal.entity.Vote;
import com.bluepal.service.impl.CandidateServiceImpl;
import com.bluepal.service.impl.ElectionServiceImpl;
import com.bluepal.service.impl.VoteServiceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/results")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminResultsController {

    private final VoteServiceImpl voteService;
    private final CandidateServiceImpl candidateService;
    private final ElectionServiceImpl electionService;

    // Get detailed results for a specific election
    @GetMapping("/election/{electionId}")
    public AdminElectionResultDTO getElectionResults(@PathVariable Long electionId) {
        Election election = electionService.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        List<Candidate> candidates = candidateService.findByElection(election);
        List<Vote> votes = voteService.findByElection(election);
        long totalVotes = votes.size();

        List<AdminCandidateResultDTO> candidateResults = candidates.stream().map(c -> {
            long voteCount = votes.stream()
                    .filter(v -> v.getCandidate().getId().equals(c.getId()))
                    .count();
            double percentage = totalVotes == 0 ? 0 : ((double) voteCount / totalVotes) * 100;

            return AdminCandidateResultDTO.builder()
                    .candidateId(c.getId())
                    .candidateName(c.getName())
                    .candidatePhoto(c.getPhoto())
                    .partyName(c.getParty().getName())
                    .partyLogo(c.getParty().getLogo())
                    .voteCount(voteCount)
                    .percentage(percentage)
                    // ✅ extra admin fields
                    .candidateBio(c.getBio())
                    .electionId(election.getId())
                    .partyId(c.getParty().getId())
                    .build();
        }).sorted((a, b) -> Long.compare(b.getVoteCount(), a.getVoteCount()))
          .collect(Collectors.toList());

        AdminCandidateResultDTO winner = candidateResults.isEmpty() ? null : candidateResults.get(0);

        return AdminElectionResultDTO.builder()
                .electionId(election.getId())
                .title(election.getTitle())
                .startDate(election.getStartDate())
                .endDate(election.getEndDate())
                .totalVotes(totalVotes)
                .candidateResults(candidateResults)
                .winner(winner)
                .build();
    }

    // Get results for all elections
    @GetMapping("/all")
    public List<AdminElectionResultDTO> getAllElectionResults() {
        return electionService.findAll().stream()
                .map(election -> getElectionResults(election.getId()))
                .collect(Collectors.toList());
    }
}
