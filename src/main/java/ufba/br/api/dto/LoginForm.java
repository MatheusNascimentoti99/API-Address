package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginForm(
        @NotEmpty(message = "Nome não pode ser vazio") String name,
        @NotEmpty(message = "Senha não pode ser nula") String password) {
}
