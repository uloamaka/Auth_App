CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255),
	"password" varchar(255) NOT NULL,
	"access_token" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp (6) with time zone,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "organisations" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	CONSTRAINT "organisations_org_id_unique" UNIQUE("org_id")
);

CREATE TABLE IF NOT EXISTS "users_to_orgs" (
	"user_id" varchar NOT NULL,
	"org_id" varchar NOT NULL,
	CONSTRAINT "users_to_orgs_user_id_org_id_pk" PRIMARY KEY("user_id","org_id")
);

DO $$ BEGIN
 ALTER TABLE "users_to_orgs" ADD CONSTRAINT "users_to_orgs_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_orgs" ADD CONSTRAINT "users_to_orgs_org_id_organisations_org_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organisations"("org_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
