package com.phonebook.web;

import com.phonebook.exceptions.NotFoundException;
import com.phonebook.model.Contact;
import com.phonebook.model.Phone;
import com.phonebook.service.ContactService;
import com.phonebook.service.PhoneService;
import com.phonebook.web.json.JsonUtil;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.web.SpringJUnitWebConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.phonebook.web.RControllerTestData.*;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringJUnitWebConfig(locations = {"classpath:phonebook-app.xml"})
class RestControllerTest {

//    @Resource
//    private WebApplicationContext webApplicationContext;
//
//    @Resource
//    private ContactService contactRepo;
//
//    @Resource
//    private PhoneService phoneService;
//
//    private MockMvc mvc;
//
//    @PostConstruct
//    public void createEnvironment(){
//        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
//        encodingFilter.setEncoding("UTF-8");
//        encodingFilter.setForceEncoding(true);
//
//        mvc = MockMvcBuilders
//                .webAppContextSetup(webApplicationContext)
//                .addFilter(encodingFilter)
//                .build();
//    }
//
//    @Test
//    void getAllContacts() throws Exception {
//         mvc.perform(MockMvcRequestBuilders.get(GET_ALL_URI))
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                .andExpect(CONTACT_MATCHER.contentJson(CONTACT_WILHELM, CONTACT_BEOWULF, CONTACT_GERHARD));
//    }
//
//    @Test
//    void getContact() throws Exception {
//        mvc.perform(MockMvcRequestBuilders.get(CONTACT_URI))
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                .andExpect(CONTACT_MATCHER.contentJson(CONTACT_GERHARD));
//    }
//
//    @Test
//    void createContact() throws Exception {
//        ResultActions action = mvc.perform(
//                MockMvcRequestBuilders.post(ADD_CONTACT_URI)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(JsonUtil.writeValue(NEW_CONTACT))
//            ).andDo(print())
//                .andExpect(status().isCreated());
//
//        Contact createdContact = JsonUtil.readValue(action.andReturn().getResponse().getContentAsString(), Contact.class);
//
//        CONTACT_MATCHER.assertMatch(createdContact, NEW_CONTACT);
//    }
//
//    @Test
//    void addContact() throws Exception {
//        ResultActions addContact = mvc.perform(
//                MockMvcRequestBuilders.post(CONTACT_URI)
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(JsonUtil.writeValue(NEW_CONTACT))
//        ).andDo(print())
//            .andExpect(status().isOk());
//
//        Contact newContact = JsonUtil.readValue(addContact.andReturn().getResponse().getContentAsString(), Contact.class);
//        CONTACT_MATCHER.assertMatch(newContact, NEW_CONTACT);
//    }
//
//    @Test
//    void addPhone() throws Exception{
//        ResultActions addPhone = mvc.perform(
//                MockMvcRequestBuilders.post(ADD_PHONE_URI)
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(JsonUtil.writeValue(NEW_PHONE))
//            ).andDo(print())
//            .andExpect(status().isCreated());
//
//        Phone newPhone = JsonUtil.readValue(addPhone.andReturn().getResponse().getContentAsString(), Phone.class);
//        PHONE_MATCHER.assertMatch(newPhone, NEW_PHONE);
//    }
//
//    @Test
//    void editPhone() throws Exception{
//        ResultActions editPhone = mvc.perform(
//                MockMvcRequestBuilders.post(PHONE_URI)
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(JsonUtil.writeValue(NEW_PHONE))
//            ).andDo(print())
//            .andExpect(status().isOk());
//
//        Phone newPhone = JsonUtil.readValue(editPhone.andReturn().getResponse().getContentAsString(), Phone.class);
//        PHONE_MATCHER.assertMatch(newPhone, NEW_PHONE);
//
//        ResultActions editContact = mvc.perform(MockMvcRequestBuilders.get(CONTACT_URI))
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                .andExpect(CONTACT_MATCHER.contentJson(EDITED_CONTACT));
//    }
//
//    @Test
//    void deleteContact() throws Exception{
//        mvc.perform(MockMvcRequestBuilders.delete(CONTACT_URI))
//            .andDo(print())
//            .andExpect(status().isNoContent());
//
//        assertNull(contactRepo.getById(CONTACT_ID).orElse(null));
//    }
//
//    @Test
//    void  deletePhone() throws Exception{
//        mvc.perform(MockMvcRequestBuilders.delete(PHONE_URI))
//                .andDo(print())
//                .andExpect(status().isNoContent());
//
//        assertNull(phoneService.getById((int)PHONE_ID));
//    }
//
//    @Test
//    void searchByName() throws Exception{
//        ResultActions searchByName = mvc.perform(MockMvcRequestBuilders.get(SEARCH_NAME))
//                .andDo(print())
//                .andExpect(status().isOk());
//
//        List<Contact> searchedContacts = JsonUtil.readValues(searchByName.andReturn().getResponse().getContentAsString(), Contact.class);
//
//        List expectedContacts = new ArrayList<>(Collections.singletonList(CONTACT_GERHARD));
//
//        CONTACT_MATCHER.assertMatch(expectedContacts, searchedContacts);
//    }
//
//    @Test
//    void searchByPhone() throws Exception {
//        ResultActions searchByPhone = mvc.perform(MockMvcRequestBuilders.get(SEARCH_PHONE))
//                .andDo(print())
//                .andExpect(status().isOk());
//
//        List<Contact> searchedContacts = JsonUtil.readValues(searchByPhone.andReturn().getResponse().getContentAsString(), Contact.class);
//
//        List<Contact> expectedContacts = new ArrayList<>(Collections.singletonList(CONTACT_GERHARD));
//        CONTACT_MATCHER.assertMatch(expectedContacts, searchedContacts);
//    }
}