
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
    "role" varchar(255) NOT NULL DEFAULT 'regular'
);

CREATE TABLE "cohort" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "start_date" date NOT NULL,
    "graduation_date" date NOT NULL
);


CREATE TABLE "alum" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "placed" boolean DEFAULT 'false',
    "cohort_id" bigint NOT NULL
);

CREATE TABLE "alum_note" (
    "id" SERIAL PRIMARY KEY,
    "alum_id" integer NOT NULL,
    "note" VARCHAR (100000) NOT NULL,
    "date" TIMESTAMP,
    "reminder" BOOLEAN NOT NULL DEFAULT 'false',
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
    "title" VARCHAR (80) NOT NULL,
    "date" DATE NOT NULL,
    "stack_type" VARCHAR (250) NOT NULL,
    "description" VARCHAR (250) NOT NULL,
    "topic" VARCHAR (250) NOT NULL,
    "confirm_attendance" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "event_tag" (
    "id" SERIAL PRIMARY KEY,
    "event_id" integer NOT NULL,
    "skill" VARCHAR (250) NOT NULL,
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
	
CREATE TABLE "event_note" (
    "id" SERIAL PRIMARY KEY,
    "event_id" integer NOT NULL,
    "note" VARCHAR(100000) NOT NULL,
    "date" TIMESTAMP,
    "reminder"  BOOLEAN NOT NULL DEFAULT 'false',
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "event_attendance" (
    "id" SERIAL PRIMARY KEY,
    "alum_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    FOREIGN KEY ("event_id") REFERENCES "event"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("alum_id") REFERENCES "alum"(id) ON DELETE CASCADE ON UPDATE CASCADE
);