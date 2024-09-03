package ufba.br.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UserDetails;

import ufba.br.api.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    UserDetails findByName(String name);
    
}