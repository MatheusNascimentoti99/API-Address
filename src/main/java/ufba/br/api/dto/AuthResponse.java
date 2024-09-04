package ufba.br.api.dto;

import lombok.Getter;
import ufba.br.api.model.User;

@Getter
public class AuthResponse {
    private User user;
    private String token;

    public AuthResponse(User user, String token) {
        this.token = token;
        this.user = user;   
    }
}
