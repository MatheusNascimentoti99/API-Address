package ufba.br.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ufba.br.api.dto.CommunityAnalitycForm;
import ufba.br.api.dto.CommunityForm;
import ufba.br.api.dto.DashboardResponse;
import ufba.br.api.exceptions.UserNotAllowedException;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;
import ufba.br.api.service.CommunityService;
import ufba.br.api.service.AuthorizationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping
    public ResponseEntity<Object> store(Authentication authentication, @RequestBody @Valid CommunityForm community) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        Community newCommunity = communityService.createCommunity(community, user);
        return ResponseEntity.ok(newCommunity.getId());        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable("id") Long id) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        communityService.deleteCommunity(id, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/my")
    public ResponseEntity<List<Community>> indexMy(Authentication authentication) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        List<Community> communities = communityService.getUserCommunities(user);
        return ResponseEntity.ok(communities);
    }

    @GetMapping
    public ResponseEntity<List<Community>> index() {
        List<Community> communities = communityService.getCommunities();
        return ResponseEntity.ok(communities);
    }
    
    @GetMapping("/top")
    public ResponseEntity<List<Community>> indexTop() {
        List<Community> communities = communityService.getTop3Communities();
        return ResponseEntity.ok(communities);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> dashBoard() {

        DashboardResponse dashboardResponse = new DashboardResponse();
        dashboardResponse.setCountUsersWithCommunity(communityService.countCommunitiesWithUsers());
        dashboardResponse.setAvgAddressByCommunity(communityService.avgAddressByCommunity());
        dashboardResponse.setCountCommunities(communityService.countCommunities());
        dashboardResponse.setCommunityCountGroup(communityService.countAddressByCommunity());
        return ResponseEntity.ok(dashboardResponse);
    }

    @GetMapping("/{id}/analitycs")
    public ResponseEntity<CommunityAnalitycForm> countAddressesInCommunity(@PathVariable("id") Long id) {
        CommunityAnalitycForm response = new CommunityAnalitycForm();
        response.setCountAddress(communityService.countAddressesInCommunity(id));
        return ResponseEntity.ok(response);
    }
    
    
}
