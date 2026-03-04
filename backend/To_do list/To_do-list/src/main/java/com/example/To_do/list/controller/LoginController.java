package com.example.To_do.list.controller;

import com.example.To_do.list.entity.User;
import com.example.To_do.list.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        User user = userRepository
                .findByUsername(loginUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user; // 🔥 returning full user (includes id)
    }
}