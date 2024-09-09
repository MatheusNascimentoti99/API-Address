package ufba.br.api.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DashboardResponse {
    private long countUsersWithCommunity;
    private long countCommunities;
    private float avgAddressByCommunity;
    private List<CommunityCountGroupResponse> communityCountGroup;
}
