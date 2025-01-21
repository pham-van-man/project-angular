package org.example.learnengbackend.service.user;

import org.example.learnengbackend.model.Role;
import org.example.learnengbackend.model.User;
import org.example.learnengbackend.repository.RoleRepository;
import org.example.learnengbackend.repository.UserRepository;
import org.example.learnengbackend.model.UserInfo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserInfoService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUser(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        List<Role> roles = roleRepository.findByUser(user);
        return new UserInfo(user, roles);
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }
}
