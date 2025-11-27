package com.bluepal.service;

import com.bluepal.entity.Vote;
import com.bluepal.entity.User;
import com.bluepal.entity.Election;
import com.bluepal.entity.Candidate;
import java.util.List;
import java.util.Optional;

public interface VoteService {

    Vote saveVote(Vote vote);

    Optional<Vote> findById(Long id);

    Optional<Vote> findByVoterAndElection(User voter, Election election);

    List<Vote> findByElection(Election election);

    List<Vote> findByCandidate(Candidate candidate);

    void deleteVote(Long id);
}
