package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;

public record CommunityForm(
    @NotEmpty String name,
    @NotEmpty String description) {}
