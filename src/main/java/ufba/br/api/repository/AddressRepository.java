package ufba.br.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import ufba.br.api.model.Address;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;


@Repository
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {
    Address save(Address entity);
    Page<Address> findAllByUser(User user, Pageable pageable);
    Address findByIdAndUser(Long id, User user);
    Address findById(Long id);
    void deleteById(Long id);
    boolean existsById(Long id);
}