package org.example.learnengbackend.service.user;

import org.example.learnengbackend.dto.UserRequest;
import org.example.learnengbackend.exception.UnauthorizedException;
import org.example.learnengbackend.exception.ValidationException;
import org.example.learnengbackend.repository.RoleRepository;
import org.example.learnengbackend.repository.UserRepository;
import org.example.learnengbackend.model.Role;
import org.example.learnengbackend.model.User;
import org.example.learnengbackend.util.JwtUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           RoleRepository roleRepository,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void changePassword(UserRequest userRequest) {
        User user = getCurrentUser();
        if (user == null) {
            throw new UnauthorizedException("Người dùng chưa đăng nhập");
        }
        if (!passwordEncoder.matches(userRequest.getCurrentPassword(), user.getPassword())) {
            throw new UnauthorizedException("Mật khẩu hiện tại không đúng");
        }
        user.setPassword(passwordEncoder.encode(userRequest.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Người dùng chưa đăng nhập");
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public void isAdmin() {
        User auTh = getCurrentUser();
        List<Role> roles = roleRepository.findByUser(auTh);
        boolean isAdmin = roles.stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("ADMIN"));
        if (!isAdmin) {
            throw new UnauthorizedException("Bạn không có quyền thực hiện hành động này");
        }
    }

    @Override
    public String registerUser(UserRequest userRequest) {
        Map<String, String> error = new LinkedHashMap<>();
        if (userRepository.findByUsername(userRequest.getUsername()) != null) {
            error.put("username", "Tên tài khoản đã có người sử dụng");
        }
        if (!userRequest.getPassword().equals(userRequest.getRePassword())) {
            error.put("re-password", "Mật khẩu không khớp");
        }
        if (!error.isEmpty()) {
            throw new ValidationException(error);
        }
        User user = new User();
        BeanUtils.copyProperties(userRequest, user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        Role role = new Role();
        role.setUser(user);
        role.setName("USER");
        roleRepository.save(role);
        return getToken(userRequest);
    }

    @Override
    public String getToken(UserRequest userRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtUtil.generateTokenLogin(authentication);
    }
}
