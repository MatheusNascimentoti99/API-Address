package ufba.br.api.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import ufba.br.api.dto.AddressForm;
import ufba.br.api.dto.PaginationResponse;
import ufba.br.api.exceptions.AddresNotFoundException;
import ufba.br.api.exceptions.UserNotAllowedException;
import ufba.br.api.model.Address;
import ufba.br.api.model.User;
import ufba.br.api.repository.UserRepository;
import ufba.br.api.service.AddressService;
import ufba.br.api.service.CommunityService;
import ufba.br.api.service.AuthorizationService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;
    @Autowired
    private CommunityService communityService;

    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping
    public ResponseEntity<PaginationResponse<Address>> index(Authentication authentication,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "5", required = false) int size) {

        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        return new ResponseEntity<>(addressService.getAddresses(user, page, size), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> show(Authentication authentication, @PathVariable("id") Long id) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        Address address = addressService.getAddress(user, id);
        if (address == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(address);
    }

    @PostMapping
    public ResponseEntity<Object> store(Authentication authentication, @RequestBody @Valid AddressForm entity) {
        // get current logged user
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }
        Address address = new Address();
        address.setCity(entity.city());
        address.setCountry(entity.country());
        address.setNumber(entity.number());
        address.setZipCode(entity.zipCode());
        address.setState(entity.state());
        address.setStreet(entity.street());
        address.setComplement(entity.complement());
        address.setUser(user);
        addressService.store(address);
        address.setCommunities(communityService.getCommunities(entity.communitiesIds()));
        addressService.store(address);
        // Create a Map representing the response
        Map<String, Long> response = new HashMap<>();
        response.put("id", address.getId());
        return ResponseEntity.ok(response);

    }

    @PutMapping("/{id}")
    public Address update(Authentication authentication, @PathVariable("id") Long id, @RequestBody @Valid AddressForm entity) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }

        Address address = addressService.getAddress(user, id);

        if (address == null) {
            throw new AddresNotFoundException();
        }
        address.setCity(entity.city());
        address.setCountry(entity.country());
        address.setNumber(entity.number());
        address.setZipCode(entity.zipCode());
        address.setState(entity.state());
        address.setStreet(entity.street());
        address.setComplement(entity.complement());
        addressService.store(address);
        address.setCommunities(communityService.getCommunities(entity.communitiesIds()));
        return addressService.store(address);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(Authentication authentication, @PathVariable("id") Long id) {
        User user = (User) authorizationService.loadUserByUsername(authentication.getName());
        if (!(user instanceof User)) {
            throw new UserNotAllowedException();
        }

        if (addressService.getAddress(user, id) == null) {
            throw new AddresNotFoundException();
        }

        if (addressService.delete(id)) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

}
