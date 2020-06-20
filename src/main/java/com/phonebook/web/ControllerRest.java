package com.phonebook.web;

import com.phonebook.exceptions.NotFoundException;
import com.phonebook.exceptions.RestNotFoundException;
import com.phonebook.model.Contact;
import com.phonebook.model.Phone;
import com.phonebook.service.ContactService;
import com.phonebook.service.PhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = ControllerRest.REST, produces = MediaType.APPLICATION_JSON_VALUE)
public class ControllerRest {

    public static final String REST = "/rest";
    public static final String SEARCH_BY_NUMBER = "/searchByNumber";
    public static final String SEARCH_BY_NAME = "/searchByName";
    public static final String GET_ALL = "/response";
    public static final String ADD_CONTACT = "/createNewContact";
    public static final String PHONE = "/phone";
    public static final String CONTACT = "/contact";
    public static final String CONTACTS = "/contacts";
    public static final String PHONE_SEARCH_PARAM = "phoneSubstring";
    public static final String NAME_SEARCH_PARAM = "nameSubstring";
    public static final String ADD_PHONE = "/createNewPhone";

    private final ContactService contactService;

    private final PhoneService phoneService;

    @Autowired
    public ControllerRest(ContactService contactService, PhoneService phoneService) {
        this.contactService = contactService;
        this.phoneService = phoneService;
    }

    @GetMapping(CONTACTS + GET_ALL)
    public List<Contact> getAll() {
        return contactService.getAllContacts();
    }

    @GetMapping(PHONE + "/{id}")
    public Contact getPhone(@PathVariable Integer id){
        Phone phone = phoneService.getById(id);

        if(phone == null) return null;

        Contact contact = contactService.getByPhone(phone);

        if(contact == null) return null;

        contact.setNumbers(Collections.singletonList(phone));

        return contact;
    }

    @GetMapping(value = CONTACT + "/{id}")
    public Contact getContact(@PathVariable int id){
        return contactService.getById(id).orElse(null);
    }

    @PostMapping(value = CONTACT + "/{id}")
    public Contact editContact(@PathVariable int id, @RequestBody Contact newContact)
    {
        Contact contact = contactService.getById(id).orElseThrow(() -> new NotFoundException("Контакт не найден"));

        contact.setNumbers(newContact.getNumbers());
        contact.setName(newContact.getName());

        return contact;
    }

    @PostMapping(PHONE + "/{id}")
    public Phone editPhone(@PathVariable int id, @RequestBody Phone newPhone)
    {
        Phone phone = phoneService.getById(id);

        phone.setPhoneNumber(newPhone.getPhoneNumber());

        phoneService.addOrUpdate(phone);

        return phone;
    }

    @PostMapping(value = CONTACTS + ADD_CONTACT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Contact addContact(@RequestBody Contact contact){
        contactService.add(contact);
        return contact;
    }

    @DeleteMapping(value = CONTACT + "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContact(@PathVariable Integer id) throws RestNotFoundException, RestBadRequest {
        contactService.deleteById(id);
    }

    @PostMapping(value = CONTACTS + "/{contactId}" + ADD_PHONE)
    @ResponseStatus(HttpStatus.CREATED)
    public Phone addPhone(@RequestBody Phone phone, @PathVariable int contactId) {
        phone.setContact(contactService.getById(contactId).orElseThrow(() -> new NotFoundException("Контакт не найден")));
        phoneService.addOrUpdate(phone);
        return phone;
    }

    @DeleteMapping(PHONE + "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePhone(@PathVariable int id){
        phoneService.deleteById(id);
    }

    @GetMapping(CONTACTS + SEARCH_BY_NAME)
    @ResponseStatus(HttpStatus.OK)
    public List<Contact> searchByName(@RequestParam(NAME_SEARCH_PARAM) String name){
        return contactService.searchByName(name);
    }

    @GetMapping(CONTACTS + SEARCH_BY_NUMBER)
    @ResponseStatus(HttpStatus.OK)
    public List<Contact> searchByPhone(@RequestParam(PHONE_SEARCH_PARAM) long number){
        return contactService.searchByPhone(number);
    }

}