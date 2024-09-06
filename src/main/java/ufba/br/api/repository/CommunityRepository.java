package ufba.br.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import ufba.br.api.model.Community;


@Repository
public interface CommunityRepository extends ListCrudRepository<Community, Long>, CommunityRepositoryCustom {
    List<Community> findMostPopularCommunities();

    @Query("SELECT COUNT(DISTINCT u.id) FROM Community c JOIN c.addresses a JOIN a.user u")
    Long countUsersWithCommunity();

    @Query("SELECT AVG(result.value) as value from (SELECT COUNT(a.id) as value FROM Community c JOIN c.addresses a group by c.id) as result")
    Long avgAddressByCommunity();

}
