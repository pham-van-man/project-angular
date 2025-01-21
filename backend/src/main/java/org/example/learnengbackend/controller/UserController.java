package org.example.learnengbackend.controller;

import org.example.learnengbackend.dto.UserResponse;
import org.example.learnengbackend.model.User;
import org.example.learnengbackend.service.user.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<?> getUserDetail() {
        try {
            User user = userService.getCurrentUser();
            UserResponse userResponse = new UserResponse();
            BeanUtils.copyProperties(user, userResponse);
            return ResponseEntity.ok().body(userResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
