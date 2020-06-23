DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS phones;

DROP SEQUENCE IF EXISTS global_seq;

CREATE SEQUENCE global_seq START WITH 100000;

CREATE TABLE contacts (
    id          INTEGER PRIMARY KEY DEFAULT nextval('global_seq'),
    name        TEXT
);

CREATE TABLE phones (
    id              INTEGER PRIMARY KEY DEFAULT nextval('global_seq'),
    phone_number    BIGINT  NOT NULL,
    contact_id      INTEGER NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON UPDATE CASCADE ON DELETE CASCADE
);