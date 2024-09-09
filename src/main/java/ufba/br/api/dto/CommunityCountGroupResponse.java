package ufba.br.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class CommunityCountGroupResponse {
    private String name;
    private long id;
    private long countAddress;
}
