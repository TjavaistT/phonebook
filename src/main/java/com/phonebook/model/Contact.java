package com.phonebook.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "contacts")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Contact extends AbstractBaseEntity {

    @Column(name = "name")
    @NotBlank
    private String name;

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "contact",
//            cascade = CascadeType.ALL,
            targetEntity = Phone.class
    )
    public List<Phone> phones;

    public Contact() {
        this.name = null;
    }

    public Contact(String name, Phone... phones) {
        this.name = name;
        this.phones = Arrays.asList(phones);
    }

    public Contact(Integer id, String name, Phone... phones) {
        super(id);
        this.name = name;
        this.phones = Arrays.asList(phones);
    }

    public List<Phone> getNumbers() {
        return phones;
    }

    public void setNumbers(List<Phone> numbers) {
        this.phones = numbers;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){ this.name = name;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return phones.equals(contact.phones) &&
                name.equals(contact.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(phones, name);
    }

    @Override
    public String toString() {
        return "Contact{" +
                "numbers=" + phones +
                ", name='" + name + '\'' +
                '}';
    }
}
