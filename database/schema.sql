set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL unique,
    "passwordHash" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "plans" (
    "planId" serial NOT NULL,
    "title" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" integer NOT NULL,
    CONSTRAINT "plans_pk" PRIMARY KEY ("planId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "requests" (
    "requestId" serial NOT NULL,
    "note" TEXT,
    "planId" integer NOT NULL,
    "fromUserId" integer NOT NULL,
    "toUserId" integer NOT NULL,
    CONSTRAINT "requests_pk" PRIMARY KEY ("requestId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "availabilities" (
    "availabilityId" serial NOT NULL,
    "description" TEXT,
    "time" time NOT NULL,
    "userId" integer NOT NULL unique,
    CONSTRAINT "availabilities_pk" PRIMARY KEY ("availabilityId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "plans" ADD CONSTRAINT "plans_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk0" FOREIGN KEY ("planId") REFERENCES "plans"("planId");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk1" FOREIGN KEY ("fromUserId") REFERENCES "users"("userId");
ALTER TABLE "requests" ADD CONSTRAINT "requests_fk2" FOREIGN KEY ("toUserId") REFERENCES "users"("userId");
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
