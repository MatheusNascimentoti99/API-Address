package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ufba.br.api.dto.UserForm;
import ufba.br.api.model.User;
import ufba.br.api.service.AuthorizationService;
import ufba.br.api.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("register")
    public ResponseEntity<Object> register(@RequestBody @Valid UserForm user) {
        if (userService.userExists(user.name())) {
            return ResponseEntity.badRequest().build();
        }

        User newUser = userService.store(user);
        Map<String, Object> response = new HashMap<>();
        response.put("id", newUser.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("me")
    public ResponseEntity<User> verifyUser(Authentication authentication) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        return ResponseEntity.ok(user);
    }
    
    
}
