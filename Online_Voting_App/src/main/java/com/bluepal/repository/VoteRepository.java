package com.bluepal.repository;

import com.bluepal.entity.Vote;
import com.bluepal.entity.User;
import com.bluepal.entity.Election;
import com.bluepal.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByVoterAndElection(User voter, Election election);

    List<Vote> findByElection(Election election);

    List<Vote> findByCandidate(Candidate candidate);
    List<Vote> findByVoter(User voter);

}
