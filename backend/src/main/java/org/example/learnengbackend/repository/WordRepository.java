package org.example.learnengbackend.repository;

import org.example.learnengbackend.model.User;
import org.example.learnengbackend.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByCreatedByOrderByUpdatedAtDesc(User user);
}
