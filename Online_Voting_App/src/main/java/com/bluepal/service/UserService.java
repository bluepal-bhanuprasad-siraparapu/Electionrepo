package com.bluepal.service;

import com.bluepal.entity.User;
import com.bluepal.dto.UserRequestDTO;
import com.bluepal.dto.UserResponseDTO;
import com.bluepal.entity.Role;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByVoterId(String voterId);

    List<User> findByRole(Role role);

    void deleteUser(Long id);
    
    public UserResponseDTO updateUser(String email, UserRequestDTO dto); 
}
