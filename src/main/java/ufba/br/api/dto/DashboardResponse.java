package ufba.br.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardResponse {
    private long countUsersWithCommunity;
    private long countCommunities;
    private long avgAddressByCommunity;
}
