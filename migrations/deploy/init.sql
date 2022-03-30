-- Deploy kanpus:init to pg

BEGIN;

CREATE DOMAIN nametext AS TEXT CHECK (LENGTH(VALUE) <= 30);

CREATE TABLE "kanpus_place" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name nametext NOT NULL UNIQUE,
    position INT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (position >= 0)
);

CREATE TABLE "kanpus_event" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name nametext NOT NULL,
    address TEXT,
    note TEXT,
    equipment TEXT,
    role TEXT,
    start_date TIMESTAMPTZ NOT NULL,
    duration INTERVAL NOT NULL,
    place_id INT NOT NULL REFERENCES kanpus_place(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);
CREATE TABLE "kanpus_promo" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name nametext NOT NULL UNIQUE,
    start_school_year DATE,
    end_school_year DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "kanpus_user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname nametext NOT NULL,
    lastname nametext NOT NULL,
    address TEXT,
    phone_number TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    image TEXT,
    color TEXT,
    role TEXT NOT NULL,
    is_permanent BOOLEAN,
    promo_id INT NOT NULL REFERENCES kanpus_promo(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (LENGTH(color)<= 7),
    CHECK (LENGTH(phone_number)<= 15),
    CHECK (LENGTH(password)>= 3)
);

CREATE TABLE "kanpus_user_has_event" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES kanpus_user(id),
    event_id INT NOT NULL REFERENCES kanpus_event(id),
    is_absent BOOLEAN NOT NULL DEFAULT false
);



CREATE TABLE "kanpus_group" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name nametext NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    
);

CREATE TABLE "kanpus_user_has_group" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES kanpus_user(id),
    group_id INT NOT NULL REFERENCES kanpus_group(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
