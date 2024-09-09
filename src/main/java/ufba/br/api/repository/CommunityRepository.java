package ufba.br.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ufba.br.api.dto.CommunityCountGroupResponse;
import ufba.br.api.model.Community;

@Repository
public interface CommunityRepository extends ListCrudRepository<Community, Long>, CommunityRepositoryCustom {
    List<Community> findMostPopularCommunities();

    @Query("SELECT COUNT(DISTINCT u.id) FROM Community c JOIN c.addresses a JOIN a.user u")
    Long countUsersWithCommunity();

    @Query("SELECT AVG(result.value) AS value FROM (SELECT COUNT(a.id) AS value FROM Community c JOIN c.addresses a GROUP BY c.id) AS result")
    float avgAddressByCommunity();

    @Query("SELECT count(a.id) FROM Address a JOIN a.communities c WHERE c.id = :id")
    Long countAddressesInCommunity(@Param("id") Long id);

    @Query("SELECT new ufba.br.api.dto.CommunityCountGroupResponse(c.name, c.id, COUNT(a.id) as countAddress) FROM Community c JOIN c.addresses a GROUP BY c.id")
    List<CommunityCountGroupResponse> countAddressByCommunity();

}
