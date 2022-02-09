
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstname" VARCHAR (80) NOT NULL,
    "lastname" VARCHAR (80) NOT NULL,
    "role" varchar(255) NOT NULL DEFAULT 'regular',
    "email_address" VARCHAR (80) NOT NULL
);

CREATE TABLE "cohort" (
    "id" SERIAL PRIMARY KEY,
    "cohort_name" VARCHAR (80) NOT NULL,
    "graduation_date" date NOT NULL
);


CREATE TABLE "alum" (
    "id" SERIAL PRIMARY KEY,
    "alum_name" VARCHAR (80) NOT NULL,
    "alum_placed" boolean DEFAULT 'false',
    "alum_seeking" boolean DEFAULT 'false',
    "cohort_id" bigint NOT NULL,
    FOREIGN KEY ("cohort_id") REFERENCES "cohort"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "alum_note" (
    "id" SERIAL PRIMARY KEY,
    "alum_id" integer NOT NULL,
    "alum_note_entry" VARCHAR (100000) NOT NULL,
    "alum_note_date" TIMESTAMP,
    "alum_note_reminder" BOOLEAN NOT NULL DEFAULT 'false',
    FOREIGN KEY ("alum_id") REFERENCES "alum"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "skill" (
    "id" SERIAL PRIMARY KEY,
    "alum_id" integer NOT NULL,
    "skill" varchar(255) NOT NULL,
    FOREIGN KEY ("alum_id") REFERENCES "alum"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "event_title" VARCHAR (80) NOT NULL,
    "event_date" DATE NOT NULL,
    "time" TIME NOT NULL,
    "stack_type" VARCHAR (250) NOT NULL,
    "event_description" VARCHAR (250) NOT NULL,
    "confirm_attendance" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "event_tag" (
    "id" SERIAL PRIMARY KEY,
    "event_id" integer NOT NULL,
    "tag" VARCHAR (250) NOT NULL,
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
    
CREATE TABLE "event_note" (
    "id" SERIAL PRIMARY KEY,
    "event_id" integer NOT NULL,
    "event_note_entry" VARCHAR(100000) NOT NULL,
    "event_note_date" TIMESTAMP,
    "event_note_reminder"  BOOLEAN NOT NULL DEFAULT 'false',
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "event_attendance" (
    "id" SERIAL PRIMARY KEY,
    "alum_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("alum_id") REFERENCES "alum"(id) ON DELETE CASCADE ON UPDATE CASCADE
);




INSERT INTO "user" (username, password, firstname, lastname , role)
VALUES ('jenny', 'password', 'jenny', 'cahill', 'admin');


INSERT INTO "cohort" (cohort_name, graduation_date)
VALUES ('ionian', '2/25/2022');


INSERT INTO "alum" (alum_name, alum_placed, alum_seeking, cohort_id)
VALUES ('jenny', false, false, 1);


INSERT INTO "alum_note" (alum_id, alum_note_entry, alum_note_date, alum_note_reminder)
VALUES (1, 'This is the note', NOW(), true);


INSERT INTO "skill" (alum_id, skill)
VALUES (1, 'javascript');

INSERT INTO "event" (event_title, event_date, "time", stack_type, event_description, confirm_attendance)
VALUES ('Networking', NOW(), '9:00', 'FSE', 'All alumni are welcomed', true);


INSERT INTO "event_tag" (event_id, tag)
VALUES (1, 'Javascript');

INSERT INTO "event_note" (event_id, event_note_entry, event_note_date, event_note_reminder)
VALUES (1, 'this is a note for the event', NOW(), true);

INSERT INTO "event_attendance" ( alum_id, event_id )
VALUES (1, 1);

ALTER TABLE event_note ALTER COLUMN event_note_date SET DEFAULT NOW();

ALTER TABLE alum RENAME COLUMN "name" TO alum_name;

ALTER TABLE alum ADD COLUMN alum_skills text[];

ALTER TABLE cohort ADD COLUMN cohort_type VARCHAR (80);

ALTER TABLE alum ADD COLUMN placed_date date;

