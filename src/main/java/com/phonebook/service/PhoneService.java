package com.phonebook.service;

import com.phonebook.model.Phone;
import com.phonebook.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhoneService {

    private final PhoneRepository repository;
    @Autowired
    public PhoneService(PhoneRepository repository) {
        this.repository = repository;
    }

    public Phone getById(int id){
        return repository.findById(id).orElse(null);
    }

    public Phone addOrUpdate(Phone phone) {
        Phone savedPhone = repository.findByPhoneNumber(phone.getPhoneNumber());

        return savedPhone == null ? add(phone) : update(phone, savedPhone);
    }

    private Phone update(Phone phone, Phone savedPhone) {
        savedPhone.setPhoneNumber(phone.getPhoneNumber());
        return add(savedPhone);
    }

    private Phone add(Phone phone) {
        return repository.save(phone);
    }

    public void deleteById(int id){
        repository.deleteById(id);
    }
}
