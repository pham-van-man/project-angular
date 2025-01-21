package org.example.learnengbackend.repository;

import org.example.learnengbackend.model.Role;
import org.example.learnengbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findByUser(User user);
}
