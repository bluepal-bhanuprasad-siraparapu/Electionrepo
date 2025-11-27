package com.bluepal.repository;

import com.bluepal.entity.AllowedVoter;
import com.bluepal.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AllowedVoterRepository extends JpaRepository<AllowedVoter, Long> {

    List<AllowedVoter> findByElection(Election election);

    Optional<AllowedVoter> findByVoterIdAndElection(String voterId, Election election);

    // ------------------ New method ------------------
    //Optional<AllowedVoter> findByVoterId(String voterId);
    long countByElection(Election election); 
    
    List<AllowedVoter> findByVoterId(String voterId);

}
