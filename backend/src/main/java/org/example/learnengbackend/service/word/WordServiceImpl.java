package org.example.learnengbackend.service.word;

import jakarta.persistence.EntityNotFoundException;
import org.example.learnengbackend.model.User;
import org.example.learnengbackend.model.Word;
import org.example.learnengbackend.repository.WordRepository;
import org.example.learnengbackend.service.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordServiceImpl implements WordService {
    private final WordRepository wordRepository;
    private final UserService userService;

    public WordServiceImpl(WordRepository wordRepository, UserService userService) {
        this.wordRepository = wordRepository;
        this.userService = userService;
    }

    @Override
    public Word save(Word entity) {
        return wordRepository.save(entity);
    }

    @Override
    public Word get(Long aLong) {
        return wordRepository.findById(aLong).orElseThrow(() -> new EntityNotFoundException("Id không tồn tại"));
    }

    @Override
    public void delete(Long aLong) {
        wordRepository.deleteById(aLong);
    }

    @Override
    public List<Word> getAll() {
        User currentUser = userService.getCurrentUser();
        return wordRepository.findByCreatedByOrderByUpdatedAtDesc(currentUser);
    }
}
