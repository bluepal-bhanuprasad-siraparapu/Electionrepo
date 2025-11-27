package com.bluepal.repository;

import com.bluepal.entity.Candidate;
import com.bluepal.entity.Election;
import com.bluepal.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByElection(Election election);

    List<Candidate> findByParty(Party party);
}
