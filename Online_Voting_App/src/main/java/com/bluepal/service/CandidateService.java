package com.bluepal.service;

import com.bluepal.dto.CandidateRequestDTO;
import com.bluepal.dto.CandidateResponseDTO;
import com.bluepal.entity.Candidate;
import com.bluepal.entity.Election;
import com.bluepal.entity.Party;
import java.util.List;
import java.util.Optional;

public interface CandidateService {

    Candidate saveCandidate(Candidate candidate);

    Optional<Candidate> findById(Long id);

    List<Candidate> findAll();

    List<Candidate> findByElection(Election election);

    List<Candidate> findByParty(Party party);

    void deleteCandidate(Long id);
    
    public CandidateResponseDTO updateCandidate(Long id, CandidateRequestDTO dto); 
}
