package com.phonebook.service;

import com.phonebook.exceptions.NotFoundException;
import com.phonebook.model.Contact;
import com.phonebook.model.Phone;
import com.phonebook.repository.ContactRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Repository
public class ContactService {

    private final ContactRepository contactRepository;
    private final PhoneService phoneService;

    AtomicLong counter;

    public ContactService(ContactRepository contactRepository, PhoneService phoneService) {
        this.contactRepository = contactRepository;
        this.phoneService = phoneService;

        counter = new AtomicLong(0);
    }

    public void setContacts(List<Contact> contacts) {
        contactRepository.saveAll(contacts);
    }

    public List<Contact> getAllContacts() {
        List<Contact> contacts = new ArrayList<>();
        contactRepository.findAll().forEach(contacts::add);
        return contacts;
    }

    public Contact add(Contact contact) {

        contactRepository.save(contact);

        List<Phone> phones = contact.getNumbers().stream()
                .peek(phone -> phone.setContact(contact))
                .map(phoneService::addOrUpdate)
                .collect(Collectors.toList());

        return contact;
    }

    public void deleteById(int id) {
        contactRepository.deleteById(id);
    }

    public Contact getByPhone(Phone phone) {

        Predicate<Contact> filter = contact -> contact.getNumbers().stream().filter(phoneNumber -> phoneNumber.equals(phone)).findFirst()
                .orElse(null) != null;

        return searchContact(filter);
    }

    public Optional<Contact> getById(int id) {
        return contactRepository.findById(id);
    }

    public List<Contact> searchByName(String name) {
        return contactRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Contact> searchByPhone(long number) {
        return contactRepository.findByNumber(number);
    }

    private Contact searchContact(Predicate<Contact> filter) {

        return StreamSupport.stream(contactRepository.findAll().spliterator(), false)
                .filter(filter)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Не обнаруженно ни одного элемента"));
    }
}
