import { createClient } from '@libsql/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const TURSO_URL = 'libsql://aprism-website-bb0813.aws-ap-northeast-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODA5NDUyNDQsImlkIjoiMDE5ZWE4OTgtMTEwMS03YWQyLWE0N2EtNzFjYmQyNzg3MDkzIiwicmlkIjoiYWNhOWU0ZTEtODFiOC00YzVlLWE1YjUtYzVmZDg4MzQ2NGNmIn0.AQzLmaKVQMY0PZBY_xOJhUaRyeFTmvOvjSjeqEBEcydFEQDWKn4CLlKaeMOHxmgmeQh4NeBQiv_GGaZYUn6aAA';

const schema = `
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "emailVerified" DATETIME,
  "name" TEXT,
  "password_hash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'admin',
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

CREATE TABLE IF NOT EXISTS "projects" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "title_zh" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "description_zh" TEXT NOT NULL,
  "content" TEXT NOT NULL DEFAULT '',
  "content_zh" TEXT NOT NULL DEFAULT '',
  "category" TEXT NOT NULL,
  "category_zh" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "technologies" TEXT NOT NULL DEFAULT '',
  "teamSize" TEXT NOT NULL DEFAULT '',
  "timeline" TEXT NOT NULL DEFAULT '',
  "role" TEXT NOT NULL DEFAULT '',
  "year" TEXT NOT NULL DEFAULT '',
  "github_url" TEXT,
  "live_url" TEXT,
  "status" TEXT NOT NULL DEFAULT 'active',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_key" ON "projects"("slug");

CREATE TABLE IF NOT EXISTS "posts" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "title_zh" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "excerpt_zh" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "content_zh" TEXT NOT NULL DEFAULT '',
  "category" TEXT NOT NULL,
  "category_zh" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "author_id" TEXT,
  "read_time" INTEGER NOT NULL DEFAULT 5,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "published_at" DATETIME,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" DATETIME NOT NULL,
  CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "team_members"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_key" ON "posts"("slug");

CREATE TABLE IF NOT EXISTS "tags" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "name_zh" TEXT NOT NULL,
  "slug" TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "tags_name_key" ON "tags"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "tags_slug_key" ON "tags"("slug");

CREATE TABLE IF NOT EXISTS "post_tags" (
  "post_id" TEXT NOT NULL,
  "tag_id" TEXT NOT NULL,
  PRIMARY KEY ("post_id", "tag_id"),
  CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "team_members" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "name_zh" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "role_zh" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "bio_zh" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "email" TEXT,
  "github" TEXT,
  "website" TEXT,
  "type" TEXT NOT NULL DEFAULT 'member',
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "author_name" TEXT NOT NULL,
  "author_email" TEXT NOT NULL,
  "post_id" TEXT,
  "parent_id" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "feedback" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "content" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'new',
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT false,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "friend_links" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "name_zh" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "description_zh" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "logo" TEXT NOT NULL,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "key" TEXT NOT NULL,
  "value" TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "site_settings_key_key" ON "site_settings"("key");
`;

async function main() {
  console.log('Connecting to Turso...');
  const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

  console.log('Pushing schema...');
  const statements = schema.split(';').filter(s => s.trim());
  for (const stmt of statements) {
    if (stmt.trim()) {
      await client.execute(stmt.trim());
    }
  }

  console.log('Schema pushed successfully!');
  await client.close();
}

main().catch(console.error);
