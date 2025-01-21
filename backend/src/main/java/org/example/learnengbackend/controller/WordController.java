package org.example.learnengbackend.controller;

import org.example.learnengbackend.model.Word;
import org.example.learnengbackend.service.word.WordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/word")
public class WordController {
    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public ResponseEntity<?> getWords() {
        try {
            List<Word> words = (List<Word>) wordService.getAll();
            return ResponseEntity.ok().body(words);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> addWord(@RequestBody Word word) {
        try {
            Word newWord = wordService.save(word);
            return ResponseEntity.ok().body(newWord);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWord(@PathVariable Long id) {
        try {
            wordService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
