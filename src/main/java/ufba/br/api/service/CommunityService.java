package ufba.br.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.CommunityForm;
import ufba.br.api.exceptions.CommunityNotFoundException;
import ufba.br.api.exceptions.UserNotAllowedException;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;
import ufba.br.api.repository.CommunityRepository;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepositiory;

    public Community createCommunity(CommunityForm communityForm, User owner) {
        Community community = new Community();
        community.setName(communityForm.name());
        community.setDescription(communityForm.description());
        // set owner
        community.setOwner(owner);
        communityRepositiory.save(community);
        return community;
    }

    public void deleteCommunity(Long communityId, User ownUser) {
        Community community = communityRepositiory.findById(communityId).get();
        if (community.getOwner().getId() != ownUser.getId()) {
            throw new UserNotAllowedException();
        }
        communityRepositiory.delete(community);
    }

    public List<Community> getUserCommunities(User user) { 
        return user.getMyCommunities();
    }

    public List<Community> getCommunities(List<Long> ids) {
         List<Community> communities = communityRepositiory.findAllById(ids);
         return communities;
    }

    public List<Community> getCommunities() {
        return communityRepositiory.findAll();
    }

    public List<Community> getTop3Communities() {
        return communityRepositiory.findMostPopularCommunities();
    }

    public Long countCommunitiesWithUsers() {
        return communityRepositiory.countUsersWithCommunity();
    }

    public Long countCommunities() {
        return communityRepositiory.count();
    }

    public Long avgAddressByCommunity() {
        return communityRepositiory.avgAddressByCommunity();
    }

    public Long countAddressesInCommunity(Long communityId) {
        if (!communityRepositiory.existsById(communityId)) {
            throw new CommunityNotFoundException();
        }
        return communityRepositiory.countAddressesInCommunity(communityId);
    }
}
