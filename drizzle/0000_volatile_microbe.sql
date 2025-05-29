CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(256) NOT NULL,
	"body" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"date" timestamp with time zone,
	"excerpt" varchar(256),
	"tags" varchar(256),
	"slug" varchar(256) NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
