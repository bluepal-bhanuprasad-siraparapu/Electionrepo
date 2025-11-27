package com.bluepal.controller;

import com.bluepal.dto.UserRequestDTO;
import com.bluepal.dto.UserResponseDTO;
import com.bluepal.entity.Role;
import com.bluepal.entity.User;
import com.bluepal.exception.ResourceNotFoundException;
import com.bluepal.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @PostMapping("/register")
    public UserResponseDTO createUser(@RequestBody UserRequestDTO dto) {
        return userService.createUser(dto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('VOTER') and principal.username == #email)")
    public UserResponseDTO getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userService.mapToDTO(user);
    }

    @DeleteMapping("/delete/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(@PathVariable String email) {
        userService.deleteUserByEmail(email);
        return "User deleted successfully";
    }
    
    @PutMapping("/{email}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('VOTER') and principal.username == #email)")
    public UserResponseDTO updateUser(@PathVariable String email, @RequestBody UserRequestDTO dto) {
        return userService.updateUser(email, dto);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userService.mapToDTO(user);
    }


}
