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
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

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

    @GetMapping(CONTACTS + GET_ALL)
    public String showPhones(Model model){
        model.addAttribute("contacts", restController.getAll());
        return "contacts";
    }

    @GetMapping(CONTACTS + SEARCH_BY_NUMBER)
    public String searchByPhoneNumber(Model model, HttpServletRequest request){
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

    @GetMapping(PHONE + "/{id}")
    public String deletePhone(@PathVariable int id, Model model){
        restController.deletePhone(id);
        model.addAttribute("contacts", restController.getAll());
        return "redirect:/contacts/response";
    }

    @GetMapping(CONTACT + "/{id}")
    public String deleteContact(Model model, @PathVariable Integer id) {
        restController.deleteContact(id);
        model.addAttribute("contacts", restController.getAll());
        return "redirect:/contacts/response";
    }

    @GetMapping(CONTACTS + ADD_CONTACT)
    public String add(Model model, HttpServletRequest request){

        Contact contact = getContactFromRequest(request);

        restController.addContact(contact);

        model.addAttribute("contacts", restController.getAll());

        return "redirect:/contacts/response";
    }

    @PostMapping(value = CONTACTS + CONTACT +"/{contactId}/save")
    public String updateContact(
            Model model,
            @PathVariable int contactId,
            HttpServletRequest request){

        Contact requestContact = getContactFromRequest(request);
        Contact contact = restController.getContact(contactId);

        List<Phone> numbers = contact.getNumbers();
        if (!numbers.isEmpty()){
            for (Phone number : numbers) {
                restController.deletePhone(number.getId());
            }
        }

        contact.setName(requestContact.getName());
        contact.setNumbers(requestContact.getNumbers());

        restController.addContact(contact);

        model.addAttribute("contacts", restController.getAll());

        return "redirect:/contacts/response";
    }


    @PostMapping(value = CONTACTS + PHONE + "/save")
    public String addPhone(
            Model model,
            HttpServletRequest request
    ){
        Phone phone = getPhoneFromRequest(request);

        int contactId = Integer.parseInt(request.getParameter("contactid"));

        restController.addPhone(phone, contactId);

        model.addAttribute("contacts", restController.getAll());

        return "redirect:/contacts/response";
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
        return Arrays.stream(request.getParameterValues(PHONE_NUMBER_NAME))
                .filter(number -> number != null && !number.isEmpty())
                .map(String::trim)
                .map(Long::parseLong)
                .map(Phone::new)
                .toArray(Phone[]::new);
    }


    private int getId(HttpServletRequest request) {
        if (Objects.isNull(request)) { throw new IllegalArgumentException();}

        return Integer.parseInt(request.getParameter("id"));
    }
}
