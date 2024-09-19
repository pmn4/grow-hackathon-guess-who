CREATE TABLE IF NOT EXISTS "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"image_description" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
