package com.bluepal.repository;

import com.bluepal.entity.User;
import com.bluepal.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByVoterId(String voterId);

    List<User> findByRole(Role role);
}
