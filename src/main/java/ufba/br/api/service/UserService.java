package ufba.br.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.UserForm;
import ufba.br.api.model.User;
import ufba.br.api.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User store(UserForm entity) {
        User newUser;
        if (entity.role() != null) {
            newUser = new User(entity.name(), passwordEncoder.encode(entity.password()), entity.role());
        } else {
            newUser = new User(entity.name(), passwordEncoder.encode(entity.password()));
        }
        userRepository.save(newUser);
        return newUser;
    }

    public boolean userExists(String name) {
        return userRepository.findByName(name) != null;
    }
}
