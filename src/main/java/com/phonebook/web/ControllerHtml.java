package com.phonebook.web;

import com.phonebook.model.Contact;
import com.phonebook.model.Phone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import static com.phonebook.web.ControllerRest.*;

@Controller
@RequestMapping(value = "/")
public class ControllerHtml {
    public static final String PHONE_NUMBER_NAME = "phoneNumber";
    public static final String NEW_NUMBER_NAME = "newNumber";
    public static final String CONTACT_NAME = "name";

    private final ControllerRest restController;

    @Autowired
    public ControllerHtml(ControllerRest restController) {
        this.restController = restController;
    }

    @GetMapping
    public String start(){
        return "redirect:/contacts";
    }

    @GetMapping(CONTACTS)
    public String getAllContacts(Model model){
        model.addAttribute("contacts", restController.getAllContacts());
        return "contacts";
    }

    @GetMapping(CONTACTS + SEARCH_BY_NUMBER)
    public String searchByPhone(Model model, HttpServletRequest request){
        try {
            long phone = Long.parseLong(request.getParameter(PHONE_SEARCH_PARAM).trim());
            model.addAttribute("contacts", restController.searchByPhone(phone));
        } catch (NumberFormatException ex){
        }

        return "contacts";
    }

    @GetMapping(CONTACTS + SEARCH_BY_NAME)
    public String searchByName(Model model, HttpServletRequest request){
        String name = request.getParameter(NAME_SEARCH_PARAM);
        model.addAttribute("contacts", restController.searchByName(name));
        return "contacts";
    }

    @GetMapping(CONTACTS + "/{id}" + "/delete")
    public String deleteContact(Model model, @PathVariable Integer id) {
        restController.deleteContact(id);
        model.addAttribute("contacts", restController.getAllContacts());
        return "redirect:/contacts";
    }

    @GetMapping(CONTACTS + NEW)
    public String addContact(Model model, HttpServletRequest request){

        Contact contact = getContactFromRequest(request);

        restController.addContact(contact);

        model.addAttribute("contacts", restController.getAllContacts());

        return "redirect:/contacts";
    }

    @PostMapping(CONTACTS + "/{contactId}")
    public String updateContact(
            Model model,
            @PathVariable int contactId,
            HttpServletRequest request){

        Contact requestContact = getContactFromRequest(request);
        restController.editContact(contactId, requestContact);

        model.addAttribute("contacts", restController.getAllContacts());

        return "redirect:/contacts";
    }

    @PostMapping(value = CONTACTS + "/{contactId}" + PHONES + "/new")
    public String addPhone(
            Model model,
            HttpServletRequest request,
            @PathVariable int contactId
    ){
        Phone phone = getPhoneFromRequest(request);

        restController.addPhone(phone, contactId);

        model.addAttribute("contacts", restController.getAllContacts());

        return "redirect:/contacts";
    }

    private Contact getContactFromRequest(HttpServletRequest request) {
        Phone[] phones = getRequestPhones(request);

        String name = request.getParameter("name");

        return new Contact(name, phones);
    }

    private Phone getPhoneFromRequest(HttpServletRequest request) {
        long number = Long.parseLong(request.getParameter(NEW_NUMBER_NAME).trim());
        return new Phone(number);
    }

    private Phone[] getRequestPhones(HttpServletRequest request) {
        String[] numbers = request.getParameterValues(PHONE_NUMBER_NAME);

        if (numbers != null){
            return Arrays.stream(numbers)
                    .filter(number -> number != null && !number.isEmpty())
                    .map(String::trim)
                    .map(Long::parseLong)
                    .map(Phone::new)
                    .toArray(Phone[]::new);
        } else {
            return new Phone[0];
        }
    }
}
