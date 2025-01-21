package org.example.learnengbackend.service.user;

import org.example.learnengbackend.dto.UserRequest;
import org.example.learnengbackend.model.User;

public interface UserService {
    void changePassword(UserRequest userRequest);

    User getCurrentUser();

    void deleteUser(User user);

    void isAdmin();

    String registerUser(UserRequest userRequest);

    String getToken(UserRequest userRequest);
}
