package com.phonebook.web;

import com.phonebook.model.Contact;
import com.phonebook.model.Phone;

import java.net.URI;

import static com.phonebook.web.ControllerRest.REST;

public class RControllerTestData {

    public static TestMatcher<Phone> PHONE_MATCHER = TestMatcher.usingFieldsComparator(Phone.class, "id", "new");
    public static TestMatcher<Contact> CONTACT_MATCHER = TestMatcher.usingFieldsComparator(Contact.class, "id", "new");

    public static final int
            CONTACT_ID = 3,
            PHONE_ID = 3;

    public static final Phone NEW_PHONE = new Phone(5,79789990099L);

    public static final Contact
        CONTACT_WILHELM = new Contact(1,"Вильгельм", new Phone(1,79780002211L)),
        CONTACT_BEOWULF = new Contact(2, "Беовульф", new Phone(2,79780003322L)),
        CONTACT_GERHARD = new Contact(3,"Герхард",
            new Phone(3, 79780004433L),
            new Phone(4, 79780005544L)),
        NEW_CONTACT =                   new Contact(4,"Брумгильда", new Phone(79780001111L)),
        EDITED_CONTACT = new Contact(3,"Герхард",
                NEW_PHONE,
                new Phone(4, 79780005544L))
    ;

    public static final URI
            ADD_CONTACT_URI = URI.create(REST + ControllerRest.CONTACTS + ControllerRest.NEW + "/"),
            ADD_PHONE_URI = URI.create(REST + ControllerRest.CONTACTS + "/" + CONTACT_ID + ControllerRest.ADD_PHONE ),
            GET_ALL_URI = URI.create(REST + ControllerRest.CONTACTS + ControllerRest.GET_ALL + "/"),
            PHONE_URI = URI.create(REST + ControllerRest.PHONES + "/" + PHONE_ID),
            CONTACT_URI = URI.create(REST + ControllerRest.CONTACT + "/" + CONTACT_ID),
            SEARCH_NAME = URI.create(REST + ControllerRest.CONTACTS + ControllerRest.SEARCH_BY_NAME + "?" + "nameSubstring" + "=" + CONTACT_GERHARD.getName()),
            SEARCH_PHONE = URI.create(REST + ControllerRest.CONTACTS + ControllerRest.SEARCH_BY_NUMBER + "?" + "phoneSubstring" + "=" + CONTACT_GERHARD.getNumbers().get(1).getPhoneNumber());
}
