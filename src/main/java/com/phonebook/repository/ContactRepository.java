package com.phonebook.repository;

import com.phonebook.model.Contact;
import com.phonebook.model.Phone;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends CrudRepository<Contact, Integer> {

        List<Contact> findByNameContainingIgnoreCase(String name);

        @Query("select c from Contact c, Phone p where p.phoneNumber = ?1 and c.id = p.contact.id")
        List<Contact> findByNumber(long number);

        List<Contact> findAllByOrderByNameAsc();
}
