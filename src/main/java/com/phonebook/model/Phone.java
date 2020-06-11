package com.phonebook.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "phones")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Phone extends AbstractBaseEntity {

    @Column(name = "phone_number")
    private Long phoneNumber;

    //связь c Contact обозначена, но не используется при создании объекта
    //и не отображается в Json
    //это защита от циклической ссылки
    @ManyToOne(
//            optional = false,
//            fetch=FetchType.LAZY,
            fetch=FetchType.EAGER,
            targetEntity = Contact.class
    )
    @JoinColumn(name = "contact_id")
    @JsonIgnore
    public Contact contact;

    public Phone(){
        phoneNumber = null;
    }

    public Phone(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Phone(Integer id, long phoneNumber) {
        super(id);
        this.phoneNumber = phoneNumber;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Phone that = (Phone) o;
        return phoneNumber.equals(that.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phoneNumber);
    }

    @Override
    public String toString() {
        return "PhoneNumber{" +
                "phoneNumber=" + phoneNumber +
                ", id=" + id +
                '}';
    }
}
