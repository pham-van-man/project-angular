package org.example.learnengbackend.controller;

import org.example.learnengbackend.dto.UserRequest;
import org.example.learnengbackend.exception.ValidationException;
import org.example.learnengbackend.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequest userRequest) {
        try {
            String jwtResponse = userService.getToken(userRequest);
            return ResponseEntity.ok().body(jwtResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequest userRequest) {
        try {
            String jwtResponse = userService.registerUser(userRequest);
            return ResponseEntity.ok().body(jwtResponse);
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().body(e.getErrors());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody UserRequest userRequest) {
        try {
            userService.changePassword(userRequest);
            return ResponseEntity.ok("Đổi mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
