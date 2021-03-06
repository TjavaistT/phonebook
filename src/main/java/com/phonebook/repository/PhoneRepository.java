package com.phonebook.repository;

import com.phonebook.model.Phone;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRepository extends CrudRepository<Phone, Integer> {

    Phone findByPhoneNumber(long number);

}
