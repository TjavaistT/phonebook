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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(value = ControllerRest.REST, produces = MediaType.APPLICATION_JSON_VALUE)
public class ControllerRest {

    public static final String REST = "/rest";
    public static final String SEARCH_BY_NUMBER = "/searchByNumber";
    public static final String SEARCH_BY_NAME = "/searchByName";
    public static final String GET_ALL = "/response";
    public static final String NEW = "/new";
    public static final String PHONES = "/phones";
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

    @GetMapping(CONTACTS)
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    @GetMapping(CONTACTS + SEARCH_BY_NUMBER)
    @ResponseStatus(HttpStatus.OK)
    public List<Contact> searchByPhone(@RequestParam(PHONE_SEARCH_PARAM) long number){
        return contactService.searchByPhone(number);
    }

    @GetMapping(CONTACTS + SEARCH_BY_NAME)
    @ResponseStatus(HttpStatus.OK)
    public List<Contact> searchByName(@RequestParam(NAME_SEARCH_PARAM) String name){
        return contactService.searchByName(name);
    }

    @DeleteMapping(value = CONTACTS + "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteContact(@PathVariable Integer id) throws RestNotFoundException, RestBadRequest {
        contactService.deleteById(id);
    }

    @PostMapping(value = CONTACTS + NEW, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Contact  addContact(@RequestBody Contact contact){
        contactService.add(contact);
        return contact;
    }

    @GetMapping(value = CONTACTS + "/{id}")
    public Contact getContact(@PathVariable int id){
        return contactService.getById(id).orElse(null);
    }

    @GetMapping(PHONES + "/{id}")
    public Contact getPhone(@PathVariable Integer id){
        Phone phone = phoneService.getById(id);

        if(phone == null) return null;

        Contact contact = contactService.getByPhone(phone);

        if(contact == null) return null;

        contact.setNumbers(Collections.singletonList(phone));

        return contact;
    }

    @PostMapping(value = CONTACTS + "/{id}")
    public Contact editContact(@PathVariable int id, @RequestBody Contact newContact)
    {
        Contact contact = contactService.getById(id).orElseThrow(() -> new NotFoundException("Контакт не найден"));

        contact.setName(newContact.getName());

        List<Phone> oldNumbers = contact.getNumbers();
        List<Phone> newNumbers = newContact.getNumbers();

        if(newNumbers == null) oldNumbers = new ArrayList<>();

        for (int i = 0; i < oldNumbers.size(); i++) {
            Phone oldNumber = oldNumbers.get(i);
            for (int j = 0, newNumbersSize = newNumbers.size(); j < newNumbersSize; j++) {
                if(i == j){
                    Phone newNumber = newNumbers.get(j);
                    oldNumber.setPhoneNumber(newNumber.getPhoneNumber());
                }
            }
        }

        contact.setNumbers(oldNumbers);
        contactService.add(contact);

        return contact;
    }

    @PostMapping(CONTACTS + "/{contactId}" + PHONES + "/{phoneId}")
    public Phone updatePhone(@PathVariable int phoneId, @RequestBody Phone newPhone)
    {
        Phone phone = phoneService.getById(phoneId);

        phone.setPhoneNumber(newPhone.getPhoneNumber());

        phoneService.addOrUpdate(phone);
        return phone;
    }

    @PostMapping(value = CONTACTS + "/{contactId}" + PHONES + "/new", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Phone addPhone(@RequestBody Phone phone, @PathVariable int contactId) {
        phone.setContact(contactService.getById(contactId).orElseThrow(() -> new NotFoundException("Контакт не найден")));
        phoneService.addOrUpdate(phone);
        return phone;
    }

    @DeleteMapping(CONTACTS + "/{contactId}" + PHONES + "/{phoneId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePhone(@PathVariable int contactId, @PathVariable int phoneId){
        Contact contact = contactService.getById(contactId).orElse(null);

        if(contact != null) phoneService.deleteById(phoneId);
    }

    @GetMapping(CONTACTS + "/{contactId}" + PHONES + "/{phoneId}")
    @ResponseStatus(HttpStatus.OK)
    public Phone getPhone(@PathVariable int contactId, @PathVariable int phoneId){
        Phone phone = phoneService.getById(phoneId);

        if(phone == null || phone.getContact().getId() != contactId) return null;

        return phone;
    }
}