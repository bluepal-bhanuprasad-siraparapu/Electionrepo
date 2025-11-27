package com.bluepal.repository;

import com.bluepal.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PartyRepository extends JpaRepository<Party, Long> {

    Optional<Party> findByName(String name);
}
