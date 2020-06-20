    ALTER SEQUENCE global_seq RESTART WITH 100000;

    DELETE FROM contacts;
    DELETE FROM phones;

    INSERT INTO contacts(id, name)
    VALUES  (1, 'Вильгельм'),
            (2, 'Беовульф'),
            (3, 'Герхард');

    INSERT INTO phones(id, phone_number, contact_id)
    VALUES (1, 79780002211, 1),
           (2, 79780003322, 2),
           (3, 79780004433, 3),
           (4, 79780005544, 3);