package com.bluepal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "allowed_voters", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"voterId", "election_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllowedVoter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Voter ID as pre-added by admin
    @Column(nullable = false)
    private String voterId;

    @ManyToOne
    @JoinColumn(name = "election_id", nullable = false)
    private Election election;
}
