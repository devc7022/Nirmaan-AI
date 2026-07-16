package com.nirmaan.auth.domain;

import com.nirmaan.common.entity.AuditableEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;

@Entity @Table(name = "users") @Getter @Setter @NoArgsConstructor
public class User extends AuditableEntity {
    @Column(nullable = false, unique = true, length = 320) private String email;
    @Column(nullable = false, length = 100) private String fullName;
    @Column(nullable = false) private String passwordHash;
    @ElementCollection(fetch = FetchType.EAGER) @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING) @Column(name = "role", nullable = false, length = 30) private Set<Role> roles = new HashSet<>();
    @Column(nullable = false) private boolean enabled = true;
}
