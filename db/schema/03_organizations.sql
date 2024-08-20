-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  organization VARCHAR(255) NOT NULL
);
