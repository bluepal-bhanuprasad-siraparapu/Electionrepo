package com.bluepal.controller;

import com.bluepal.dto.ElectionRequestDTO;
import com.bluepal.dto.ElectionResponseDTO;
import com.bluepal.entity.Election;
import com.bluepal.entity.ElectionStatus;
import com.bluepal.exception.ResourceNotFoundException;
import com.bluepal.service.ElectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/elections")
@RequiredArgsConstructor
public class ElectionController {

    private final ElectionService electionService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ElectionResponseDTO createElection(@RequestBody ElectionRequestDTO dto) {
        return electionService.createElection(dto);
    }

    @GetMapping
    public List<ElectionResponseDTO> getAllElections() {
        return electionService.findAll().stream()
                .map(electionService::mapToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ElectionResponseDTO getElectionById(@PathVariable Long id) {
        Election election = electionService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Election not found"));
        return electionService.mapToDTO(election);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteElection(@PathVariable Long id) {
        electionService.deleteElection(id);
        return "Election deleted successfully";
    }

    @GetMapping("/status/{status}")
    public List<ElectionResponseDTO> getElectionsByStatus(@PathVariable String status) {
        ElectionStatus electionStatus;
        try {
            electionStatus = ElectionStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException("Invalid election status");
        }

        return electionService.findByStatus(electionStatus).stream()
                .map(electionService::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Update endpoint (delegates to service)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ElectionResponseDTO updateElection(@PathVariable Long id,
                                              @RequestBody ElectionRequestDTO dto) {
        return electionService.updateElection(id, dto);
    }
}
